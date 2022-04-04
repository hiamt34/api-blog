import { Document, EnforceDocument, LeanDocument } from "mongoose";
import { CategoryDocument } from "../interface";
import { Category, Post } from "../model";
import { PatternService } from "./pattern.service";

class CategoryServiceV2<T> extends PatternService<T> {
    public getAll = async () => {
        try {
            return this.model.find({}).populate("status", ["name"]);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public getAllMapCountPost = async () => {
        try {
            let mapCategories: (LeanDocument<Document<any, any, any>> & { countPost: number; })[] = [];
            let categories = await this.model.find({}).populate("status", ["name"]);
            let countPost = []
            countPost = categories.map(category => {
                return Post.countDocuments({ category: category._id });
            });
            await Promise.all(countPost).then(payload => {
                mapCategories = categories.map((item, key) => {
                    return Object.assign(item.toJSON(), { countPost: payload[key] })
                })

            })
            return mapCategories;
        } catch (error: any) {
            throw new Error(error);
        }
    };
}

export const CategoryService = new CategoryServiceV2<CategoryDocument>(
    Category
);
