import { FunctionsType, ModelFactory } from '../../src/main'

export interface ISamplePaths {
  path1: string
  path2?: string
}

export interface ISampleSchemaMethods extends FunctionsType {
  method1: () => void
}

export interface ISampleSchemaStatics extends FunctionsType {
  static1: () => void
}

const factory = new ModelFactory<ISamplePaths, ISampleSchemaMethods, ISampleSchemaStatics>({
  name: 'Sample',

  paths: {
    path1: { type: String, required: true },
    path2: String
  },

  methods: {

    method1 (): void {
      // code
      // factory.doc(this) is available
    }

  },

  statics: {

    static1 (): void {
      // code
      // factory.mod(this) is available for other static functions
    }

  }
})

export const SampleModel = factory.model
