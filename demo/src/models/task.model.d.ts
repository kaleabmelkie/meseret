/// <reference types="mongoose" />
import { FunctionsType, Document, Model } from '../../../src/main';
export interface ITaskPaths {
    done: boolean;
    created: Date;
    title: string;
    desc?: string;
}
export interface ITaskSchemaMethods extends FunctionsType {
}
export interface ITaskSchemaStatics extends FunctionsType {
}
export declare const TaskModel: Model<Document & ITaskPaths & ITaskSchemaMethods> & ITaskSchemaStatics;
