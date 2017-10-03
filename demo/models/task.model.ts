import { FunctionsType, ModelFactory, Document, Model } from '../../src/main' // replace '../src/main' by 'meseret' for your app

export interface ITaskPaths {
  done: boolean
  created: Date
  title: string
  desc?: string
}

export interface ITaskSchemaMethods extends FunctionsType { }

export interface ITaskSchemaStatics extends FunctionsType { }

const factory = new ModelFactory<ITaskPaths, ITaskSchemaMethods, ITaskSchemaStatics>({
  name: 'Task',

  paths: {
    done: { type: Boolean, required: true, default: false },
    created: { type: Date, required: true, default: Date.now },
    title: { type: String, required: true },
    desc: { type: String, required: false }
  },

  methods: { },

  statics: { }
})

export const TaskModel = factory.model

// fixme: temp: use Document and Model so that TSLint will not remove them when fixing code
console.warn('To-Do: Temp-Fix: ', {} as Document, Model) // todo: google the provided error
