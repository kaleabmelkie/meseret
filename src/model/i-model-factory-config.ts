import mongoose, { SchemaDefinition, SchemaOptions } from 'mongoose'

import { FunctionsType } from './functions-type'

export interface IModelFactoryConfig<
  ISchemaMethods extends FunctionsType,
  ISchemaStatics extends FunctionsType
> {
  name: string

  paths?: SchemaDefinition // todo: type check using `IPaths` (maybe: using a setter?)

  methods?: ISchemaMethods

  statics?: ISchemaStatics

  options?: SchemaOptions

  mongooseInstance?: typeof mongoose
}
