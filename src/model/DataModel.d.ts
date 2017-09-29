/// <reference types="mongoose" />
import {Document, Model, Schema, SchemaDefinition, SchemaOptions} from 'mongoose'
export declare type Functions = {
  [name: string]: Function;
};
export declare abstract class DataModel<Paths, Methods extends Functions, Statics extends Functions> {
  abstract name: string
  paths: SchemaDefinition
  methods: Methods
  statics: Functions
  options: SchemaOptions
  readonly schema: Schema
  readonly model: Model<Document & Paths & Methods> & Statics
}
export {SchemaDefinition, SchemaOptions, Document, Model}
