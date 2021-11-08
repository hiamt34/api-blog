import { CategoryDocument } from "../interface";
import { Category } from "../model";
import { PatternService } from "./pattern.service";

class CategoryServiceV2<T> extends  PatternService<T> {

    public getAll = async () => {
        try {
            return this.model.find({}).populate('status', ['name']);
        } catch (error: any) {
            throw new Error(error);
        }
    };

}

export const CategoryService = new CategoryServiceV2<CategoryDocument>(Category)
