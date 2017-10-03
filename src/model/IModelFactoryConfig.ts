import { FunctionsType } from './FunctionsType'
import { SchemaDefinition, SchemaOptions } from 'mongoose'

export interface IModelFactoryConfig<IPaths, ISchemaMethods extends FunctionsType, ISchemaStatics extends FunctionsType> {
  name: string

  paths?: SchemaDefinition // todo: type check using `IPaths` (maybe: using a setter?)

  methods?: ISchemaMethods

  statics?: ISchemaStatics

  options?: SchemaOptions
}
