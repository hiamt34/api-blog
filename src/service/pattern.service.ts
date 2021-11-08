import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import mongoose from "mongoose"

export class PatternService<T> {

    model: mongoose.Model<T>
    constructor(model: mongoose.Model<T>) {
        this.model = model;
    };

    public getAll = async () => {
        try {
            return this.model.find({});
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public getDetail = async (query: FilterQuery<T>) => {
        try {
            return this.model.findOne(query);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public create = async (data: DocumentDefinition<T>) => {
        try {
            return this.model.create(data);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public update = async (query: FilterQuery<T>, update: UpdateQuery<T> , option?: QueryOptions) => {
        try {
            return this.model.updateOne(query, update, option);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    public destroy = async (query: FilterQuery<T>) => {
        try {
            return this.model.deleteOne(query);
        } catch (error: any) {
            throw new Error(error);
        }
    };

};
