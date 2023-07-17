import path from "path";
import { fileURLToPath } from "url";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ApiResponse from "../services/ApiResponse.js";
import deleteFileService from "../services/deleteFileService.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Фильтрация, сортировка и пагинация (можно комбинировать или использовать отдельно)
// todo Вынести в отдельный файл с middleware

class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };

        const excludedFields = ["page", "sort", "limit"];
        excludedFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lt|lte|regex)\b/g,
            (match) => "$" + match
        );

        //    gte = greater than or equal - больше или равно
        //    например, http://localhost:8080/api/product?price[gte]=100
        //    отфильтрует по цене от 100, включая 100, и выше
        //    lte = lesser than or equal - меньше или равно
        //    lt = lesser than - меньше, чем
        //    gt = greater than - больше, чем
        //    regex - будет искать совпадение по символам, для поиска, например, по title
        this.query.find(JSON.parse(queryStr));

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        //    http://localhost:8080/api/product/?sort=price - по цене по возрастанию
        //    http://localhost:8080/api/product/?sort=-price - по цене по убыванию
        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1; // Отображаемая страница
        const limit = this.queryString.limit * 1 || 9; // Количество элементов на странице
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const productController = {
    getProducts: async (req, res, next) => {
        try {
            const features = new ApiFeatures(ProductModel.find(), req.query)
                .filtering()
                .sorting()
                .paginating();

            const products = await features.query;

            res.json({
                status: "success",
                result: products.length,
                products
            });
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const { title, category } = req.body;
            const product = await ProductModel.findOne({ title });
            if (product) {
                return next(ApiResponse.conflict("Этот товар уже существует."));
            }
            const checkCategory = await CategoryModel.findOne({
                _id: category
            });
            if (!checkCategory) {
                return next(
                    ApiResponse.notFound(
                        "Указанная категория не найдена. Если категория новая - создайте сначала категорию."
                    )
                );
            }
            const { images } = req.files;
            // Делаю уникальное имя для изображения, чтобы не проверять на совпадения, когда их будет много.
            // Изображения загружаю с компа.
            const fileName = images.md5 + path.extname(images.name);
            await images.mv(path.resolve(__dirname, "..", "static", fileName));
            if (!images) {
                return next(
                    ApiResponse.unprocessable(
                        "Не удалось загрузить изображение."
                    )
                );
            }
            const newProduct = new ProductModel({
                ...req.body,
                images: fileName
            });

            await newProduct.save();
            next(ApiResponse.created("Товар создан."));
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return next(
                    ApiResponse.notFound("Запрашиваемый товар не найден.")
                );
            }
            const { images } = product;
            console.log(images);
            await deleteFileService(
                path.resolve(__dirname, "..", "static", images)
            );
            await product.deleteOne();
            next(ApiResponse.ok("Товар удален."));
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const oldProduct = await ProductModel.findById(req.params.id);
            if (!oldProduct) {
                return next(
                    ApiResponse.notFound("Запрашиваемый товар не найден.")
                );
            }
            const { images } = req.files;
            const oldImages = oldProduct.images;
            let newImages;
            if (images) {
                if (
                    path.basename(oldImages, path.extname(oldImages)) ===
                    images.md5
                ) {
                    newImages = oldImages;
                } else {
                    newImages = images.md5 + path.extname(images.name);
                    await images.mv(
                        path.resolve(__dirname, "..", "static", newImages)
                    );
                    await deleteFileService(
                        path.resolve(__dirname, "..", "static", oldImages)
                    );
                }
            }

            await ProductModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    ...req.body,
                    images: newImages
                }
            );

            next(ApiResponse.ok("Товар обновлен."));
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};

export default productController;
