import { ModelFactory, FunctionsType } from 'meseret'

export interface ITasksSchemaPaths {
  desc: string
  done: boolean
}

export interface ITasksSchemaMethods extends FunctionsType {
  tickToggle: () => Promise<boolean>
}

export interface ITasksSchemaStatics extends FunctionsType {} // empty for now

const factory = new ModelFactory<
  ITasksSchemaPaths,
  ITasksSchemaMethods,
  ITasksSchemaStatics
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
  }
})

// optionally, you may manually also access the built schema
export const TasksSchema = factory.schema

// finally, create & export the model
export const TasksModel = factory.model
TasksModel.collection.createIndex({ '$**': 'text' }).catch(console.error)
