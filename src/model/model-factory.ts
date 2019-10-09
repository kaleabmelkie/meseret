import {
  Document,
  Model,
  model,
  Schema,
  SchemaDefinition,
  SchemaOptions
} from 'mongoose'

import { FunctionsType } from './functions-type'
import { IModelFactoryConfig } from './i-model-factory-config'

export class ModelFactory<
  IPaths = {},
  ISchemaMethods extends FunctionsType = {},
  ISchemaStatics extends FunctionsType = {}
> {
  private _schema?: Schema
  private _model?: Model<Document & IPaths & ISchemaMethods> & ISchemaStatics

  constructor(
    private _config: IModelFactoryConfig<ISchemaMethods, ISchemaStatics>
  ) {}

  get schema(): Schema {
    if (!this._schema) {
      this._schema = new Schema(this._config.paths, this._config.options)
      this._schema.method(this._config.methods || {})
      this._schema.static(this._config.statics || {})
    }

    return this._schema
  }

  get model(): Model<Document & IPaths & ISchemaMethods> & ISchemaStatics {
    if (!this._model) {
      this._model = model(this._config.name, this.schema) as Model<
        Document & IPaths & ISchemaMethods
      > &
        ISchemaStatics
    }

    return this._model
  }

  /**
   * @deprecated Use <code>documentify<code> instead. This was a typo and will be removed in version 2.
   */
  documetify(that: any): Document & IPaths & ISchemaMethods {
    return this.documentify(that)
  }

  documentify(that: any): Document & IPaths & ISchemaMethods {
    return that as Document & IPaths & ISchemaMethods
  }

  modelify(
    that: any
  ): Model<Document & IPaths & ISchemaMethods> & ISchemaStatics {
    return that as Model<Document & IPaths & ISchemaMethods> & ISchemaStatics
  }
}

export { Document, Model, Schema, SchemaDefinition, SchemaOptions }
