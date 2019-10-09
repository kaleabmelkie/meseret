import { ModelFactory, FunctionsType } from 'meseret'
import * as mongoose from 'mongoose'

export interface ITaskSchemaPaths {
  desc: string
  done: boolean
}

export interface ITaskSchemaMethods extends FunctionsType {
  tickToggle: () => Promise<boolean>
}

export interface ITaskSchemaStatics extends FunctionsType {} // empty for now

const factory = new ModelFactory<
  ITaskSchemaPaths,
  ITaskSchemaMethods,
  ITaskSchemaStatics
>({
  name: 'tasks', // collection/model name

  paths: {
    desc: { type: String, required: true, trim: true },
    done: { type: Boolean, required: true, default: false }
  },

  methods: {
    async tickToggle(): Promise<boolean> {
      const task = factory.documentify(this) // for static-type support of the `this` in this document's context
      task.done = !task.done
      await task.save()
      return task.done
    }
  },

  statics: {
    // empty for now
    // `factory.modelify(this)` is available in functions here, for static-type support of the `this` in this model's context
  },

  mongooseInstance: mongoose
})

// optionally, you may manually also access the built schema
export const TasksSchema = factory.schema

// finally, create & export the model
export const TaskModel = factory.model

// indexes
TaskModel.collection.createIndex({ '$**': 'text' }).catch(console.error)
