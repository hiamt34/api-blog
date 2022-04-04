import { PatternService } from "./pattern.service";
import { PostDocument } from "../interface";
import { Post } from "../model";
import { IConfig, IQuery } from "../controller";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

class PostService<T> extends PatternService<T> {

    public getAllAndPaginate = async ({ limit, page }: IConfig, { title, tags, category, status }: IQuery) => {

        try {
            let query = {}
            if (title) {
                query = {
                    ...query,
                    title
                }
            }
            if (category) {
                query = {
                    ...query,
                    category
                }
            }
            if (tags) {
                query = {
                    ...query,
                    tags
                }
            }
            if (status) {
                query = {
                    ...query,
                    status
                }
            }

            const count = await this.model.countDocuments(query)

            const payload = await this.model.find(query)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(limit * (page - 1))
                .populate('category')
                .populate('tags', 'name');

            return {
                payload,
                meta: {
                    perPage: limit,
                    total: count,
                    currentPage: page,
                }
            }

        } catch (error: any) {
            throw new Error(error);
        }
    };

    public getDetail = async (query: FilterQuery<T>) => {
        try {
            return this.model.findOne(query)
                .populate('category')
                .populate('tags', 'name');
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public update = async (query: FilterQuery<T>, update: UpdateQuery<T>, option?: QueryOptions) => {
        try {
            return this.model.updateOne(query, update, option)
                .populate('category')
                .populate('tags', 'name');
        } catch (error: any) {
            throw new Error(error);
        }
    };

}

export const postService = new PostService<PostDocument>(Post)
