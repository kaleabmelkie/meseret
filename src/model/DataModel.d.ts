/// <reference types="mongoose" />
import { Document, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
export declare type FunctionsType = {
    [name: string]: Function;
};
export declare abstract class DataModel<Paths, Methods extends FunctionsType, Statics extends FunctionsType> {
    abstract name: string;
    paths: SchemaDefinition;
    methods: Methods;
    statics: FunctionsType;
    options: SchemaOptions;
    readonly schema: Schema;
    readonly model: Model<Document & Paths & Methods> & Statics;
}
export { SchemaDefinition, SchemaOptions, Document, Model };
