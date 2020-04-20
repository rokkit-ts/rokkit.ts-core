import { ComponentScanner } from './ComponentScanner'
import { TypeScannerSingleton } from '@rokkit.ts/dependency-injection'
import { mocked } from 'ts-jest/dist/util/testing'

jest.mock('@rokkit.ts/dependency-injection', () => ({
  TypeScannerSingleton: { pathsOfUserComponents: jest.fn() }
}))

jest.mock('../index.ts', () => jest.fn())

describe('ComponentScanner', () => {
  it('should import a user component by source path', async () => {
    // given
    mocked(TypeScannerSingleton.pathsOfUserComponents).mockReturnValue([
      './src/index.ts'
    ])
    // when
    const importedPaths = await ComponentScanner.importUserComponents()
    // then
    expect(importedPaths).toBeDefined()
    expect(importedPaths).toHaveLength(1)
    expect(importedPaths[0]).toEqual('./src/index.ts')
  })

  it('should not import a user component when file not exists', async () => {
    // given
    mocked(TypeScannerSingleton.pathsOfUserComponents).mockReturnValue([
      './someWeirdPath/index.ts'
    ])
    // when
    const importedPaths = await ComponentScanner.importUserComponents()
    // then
    expect(importedPaths).toBeDefined()
    expect(importedPaths).toHaveLength(1)
    expect(importedPaths[0]).toEqual(undefined)
  })
})
