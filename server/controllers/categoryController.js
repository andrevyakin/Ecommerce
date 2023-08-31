import CategoryModel from "../models/CategoryModel.js";
import ProductModel from "../models/ProductModel.js";
import ApiResponse from "../services/ApiResponse.js";
import {ApiFeatures} from "./productController.js";

const categoryController = {
    getCategories: async (req, res, next) => {
        try {
            const categories = await CategoryModel.find();
            res.json(categories);
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    getCategoryById: async (req, res, next) => {
        try {
            const category = await CategoryModel.findOne(req.params.id);
            res.json(category);
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    getAllProductsByCategory: async (req, res, next) => {
        try {
            const products = await ProductModel.find({category: req.params.id}).populate("category").count();
            res.json(products);
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            const category = await CategoryModel.findOne({ name });
            if (category) {
                return next(
                    ApiResponse.conflict("Такая категория уже существует.")
                );
            }

            const newCategory = new CategoryModel({ name });

            await newCategory.save();
            res.json(newCategory);
            next(ApiResponse.created("Категория создана."));
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const products = await ProductModel.findOne({
                category: req.params.id
            });
            if (products) {
                return next(
                    ApiResponse.methodNotAllowed(
                        "Пожалуйста, удалите все продукты, этой категории."
                    )
                );
            }

            await CategoryModel.findByIdAndDelete(req.params.id);
            next(ApiResponse.ok("Категория удалена."));
        } catch (err) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            await CategoryModel.findOneAndUpdate(
                { _id: req.params.id },
                { name }
            );

            next(ApiResponse.ok("Категория обновлена."));
        } catch (e) {
            return next(
                ApiResponse.internal(
                    "На сервере произошла ошибка. Попробуйте позже."
                )
            );
        }
    }
};

export default categoryController;
