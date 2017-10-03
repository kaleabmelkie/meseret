/// <reference types="mongoose" />
import { Document, Model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import { FunctionsType } from './FunctionsType';
import { IModelFactoryConfig } from './IModelFactoryConfig';
export declare class ModelFactory<IPaths, ISchemaMethods extends FunctionsType, ISchemaStatics extends FunctionsType> {
    private _config;
    private _schema;
    private _model;
    constructor(_config: IModelFactoryConfig<ISchemaMethods, ISchemaStatics>);
    readonly schema: Schema;
    readonly model: Model<Document & IPaths & ISchemaMethods> & ISchemaStatics;
    doc(that: any): Document & IPaths & ISchemaMethods;
    mod(that: any): Model<Document & IPaths & ISchemaMethods> & ISchemaStatics;
}
export { Document, Model, Schema, SchemaDefinition, SchemaOptions };
