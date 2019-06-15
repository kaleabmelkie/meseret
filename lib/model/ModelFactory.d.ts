import {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions
} from 'mongoose'
import { FunctionsType } from './FunctionsType'
import { IModelFactoryConfig } from './IModelFactoryConfig'
export declare class ModelFactory<
  IPaths = {},
  ISchemaMethods extends FunctionsType = {},
  ISchemaStatics extends FunctionsType = {}
> {
  private _config
  private _schema?
  private _model?
  constructor(_config: IModelFactoryConfig<ISchemaMethods, ISchemaStatics>)
  readonly schema: Schema
  readonly model: Model<Document & IPaths & ISchemaMethods> & ISchemaStatics
  /**
   * @deprecated Use <code>documentify<code> instead. This was a typo and will be removed in version 2.
   */
  documetify(that: any): Document & IPaths & ISchemaMethods
  documentify(that: any): Document & IPaths & ISchemaMethods
  modelify(
    that: any
  ): Model<Document & IPaths & ISchemaMethods> & ISchemaStatics
}
export { Document, Model, Schema, SchemaDefinition, SchemaOptions }
//# sourceMappingURL=ModelFactory.d.ts.map
