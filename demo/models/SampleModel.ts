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
    }
  }

  readonly statics = {
    static1 (): void {
      // code
    }
  }
}

export const SampleModel = new SampleModelFactory().model