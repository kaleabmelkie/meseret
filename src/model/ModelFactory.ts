import { Document, Model, model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

import { FunctionsType } from './FunctionsType'

export abstract class ModelFactory<Paths, Methods extends FunctionsType, Statics extends FunctionsType> {
  abstract name: string
  paths: SchemaDefinition // fixme: type check using `ISampleModelPaths` (maybe using a setter?)
  methods: Methods
  statics: Statics
  options: SchemaOptions

  private _schema: Schema
  private _model: Model<Document & Paths & Methods> & Statics

  get schema (): Schema {
    if (!this._schema) {
      this._schema = new Schema(this.paths, this.options)
      this._schema.method(this.methods)
      this._schema.static(this.statics)
    }

    return this._schema
  }

  get model (): Model<Document & Paths & Methods> & Statics {
    if (!this._model) {
      this._model = model(this.name, this.schema) as Model<Document & Paths & Methods> & Statics
    }

    return this._model
  }
}

export { SchemaDefinition, SchemaOptions, Document, Model }
