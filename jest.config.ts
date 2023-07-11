import { type JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

type ModuleNameMapper = Required<JestConfigWithTsJest>['moduleNameMapper']

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths) as ModuleNameMapper

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true,
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper,
}

export default jestConfig
