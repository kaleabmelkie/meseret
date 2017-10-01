/// <reference types="mongoose" />
import { Document, FunctionsType, Model, ModelFactory } from '../../src/main';
export interface ISampleModelPaths {
    path1: string;
    path2?: string;
}
export interface ISampleModelMethods extends FunctionsType {
    method1: () => void;
}
export interface ISampleModelStatics extends FunctionsType {
    static1: () => void;
}
export declare class SampleModelFactory extends ModelFactory<ISampleModelPaths, ISampleModelMethods, ISampleModelStatics> {
    readonly name: string;
    readonly paths: {
        path1: {
            type: StringConstructor;
            required: boolean;
        };
        path2: StringConstructor;
    };
    readonly methods: {
        method1(): void;
    };
    readonly statics: {
        static1(): void;
    };
}
export declare const SampleModel: Model<Document & ISampleModelPaths & ISampleModelMethods> & ISampleModelStatics;
