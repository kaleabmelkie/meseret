/// <reference types="mongoose" />
import { Document, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import { FunctionsType } from './FunctionsType';
export declare abstract class ModelFactory<Paths, Methods extends FunctionsType, Statics extends FunctionsType> {
    abstract name: string;
    paths: SchemaDefinition;
    methods: Methods;
    statics: Statics;
    options: SchemaOptions;
    private _schema;
    private _model;
    readonly schema: Schema;
    readonly model: Model<Document & Paths & Methods> & Statics;
}
export { SchemaDefinition, SchemaOptions, Document, Model };
