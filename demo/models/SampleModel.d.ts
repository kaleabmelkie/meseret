/// <reference types="mongoose" />
import { Document, FunctionsType, Model } from '../../src/main';
export interface ISamplePaths {
    path1: string;
    path2?: string;
}
export interface ISampleSchemaMethods extends FunctionsType {
    method1: () => void;
}
export interface ISampleSchemaStatics extends FunctionsType {
    static1: () => void;
}
export declare const SampleModel: Model<Document & ISamplePaths & ISampleSchemaMethods> & ISampleSchemaStatics;
