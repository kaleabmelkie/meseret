import { Document, FunctionsType, Model, ModelFactory } from '../../src/main'

export interface ISampleModelPaths {
  path1: string
  path2?: string
}

export interface ISampleModelMethods extends FunctionsType {
  method1: () => void
}

export interface ISampleModelStatics extends FunctionsType {
  static1: () => void
}

// helpers
declare type DocumentType = Document & ISampleModelPaths & ISampleModelMethods
declare type ModelType = Model<DocumentType> & ISampleModelStatics

export class SampleModelFactory extends ModelFactory<ISampleModelPaths, ISampleModelMethods, ISampleModelStatics> {
  readonly name = 'Sample'

  readonly paths = {
    path1: { type: String, required: true },
    path2: String
  }

  readonly methods = {
    method1 (): void {
      // code
      // (this as DocumentType) is available for other methods
    }
  }

  readonly statics = {
    static1 (): void {
      // code
      // (this as ModelType) is available for other static functions
    }
  }
}

export const SampleModel = new SampleModelFactory().model
