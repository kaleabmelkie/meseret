import { SchemaDefinition, SchemaOptions } from 'mongoose';
import { FunctionsType } from './FunctionsType';
export interface IModelFactoryConfig<ISchemaMethods extends FunctionsType, ISchemaStatics extends FunctionsType> {
    name: string;
    paths?: SchemaDefinition;
    methods?: ISchemaMethods;
    statics?: ISchemaStatics;
    options?: SchemaOptions;
}
//# sourceMappingURL=IModelFactoryConfig.d.ts.map