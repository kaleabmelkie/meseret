import { Document, Model, model, Schema, SchemaDefinition, SchemaOptions } from 'mongoose'

import { FunctionsType } from './FunctionsType'

export abstract class DataModel<Paths, Methods extends FunctionsType, Statics extends FunctionsType> {
  abstract name: string
  paths: SchemaDefinition // fixme: type check using `Paths` (maybe using a setter?)
  methods: Methods
  statics: FunctionsType
  options: SchemaOptions

  get schema (): Schema {
    const ret = new Schema(this.paths, this.options)
    ret.method(this.methods)
    ret.static(this.statics)

    return ret
  }

  get model (): Model<Document & Paths & Methods> & Statics {
    return model(this.name, this.schema) as Model<Document & Paths & Methods> & Statics
  }
}

export { SchemaDefinition, SchemaOptions, Document, Model }
