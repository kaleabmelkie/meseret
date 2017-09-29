import { SchemaDefinition, SchemaOptions, Schema, Model, Document, model } from 'mongoose'

export declare type Functions = { [name: string]: Function }

export abstract class DataModel<Paths, Methods extends Functions, Statics extends Functions> {
  abstract name: string
  paths: SchemaDefinition // fixme: type check using `Paths` (maybe using a setter?)
  methods: Methods
  statics: Functions
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
