import path from "path";
import {fileURLToPath} from "url";
import ProductModel from "../models/ProductModel.js";
import CategoryModel from "../models/CategoryModel.js";
import ApiResponse from "../services/ApiResponse.js";
import deleteFileService from "../services/deleteFileService.js";
import {statSync} from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Фильтрация, сортировка и пагинация (можно комбинировать или использовать отдельно)
// todo Вынести в отдельный файл с middleware

export class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString};

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
        const limit = this.queryString.limit * 1 || 6; // Количество элементов на странице
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
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const {title} = req.body;
            const product = await ProductModel.findOne({title});
            if (product) {
                return next(ApiResponse.conflict("Этот товар уже существует."));
            }
            const images = req.files?.images || null;
            console.log(images);
            let fileName = null;
            if (images) {
                fileName = images.md5 + path.extname(images.name);
                await images.mv(path.resolve(__dirname, "..", "static", fileName));
            } else {
                next(
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
        } catch (err) {
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

            const images = req.files?.images || null;
            if (images) {
                await deleteFileService(
                    path.resolve(__dirname, "..", "static", images)
                );
            }

            const categoryId = product.category._id;
            const productsCount = await ProductModel.find({category: categoryId}).populate("category").count();
            console.log(productsCount);
            if (productsCount===1) {
                await product.deleteOne();
                await CategoryModel.findOneAndDelete({_id: categoryId});
            } else {
                await product.deleteOne();
            }

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
            const oldProduct = await ProductModel.findById(req.body._id);
            if (!oldProduct) {
                return next(
                    ApiResponse.notFound("Запрашиваемый товар не найден.")
                );
            }
            const images = req.files?.images || null;
            const oldImages = oldProduct?.images || null;
            let newImages = null;
            if (images) {
                if (
                    path.basename(oldImages, path.extname(oldImages)) ===
                    images.md5)
                {
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

            await ProductModel.findByIdAndUpdate({_id: req.body._id},
                {
                    ...req.body,
                    images: newImages
                }
            );

            next(ApiResponse.ok("Товар обновлен."));
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};

export default productController;
