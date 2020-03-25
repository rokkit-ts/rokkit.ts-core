import { ComponentScanner } from './componentScanner'
import autoClassDeclaration from '@rokkit.ts/dependency-injection/lib/automatic-class-declaration/autoClassDeclaration'
import { ClassDeclaration } from '@rokkit.ts/class-declaration-resolver'

describe('ComponentScanner', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should import a user component by source path', async () => {
    // given
    jest
      .spyOn(autoClassDeclaration, 'ClassDeclarations', 'get')
      .mockReturnValue([
        {
          sourceFilePath: './src/index.ts'
        } as ClassDeclaration
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
    jest
      .spyOn(autoClassDeclaration, 'ClassDeclarations', 'get')
      .mockReturnValue([
        {
          compiledFilePath: './blaaa/index.ts'
        } as ClassDeclaration
      ])

    // when
    const importedPaths = await ComponentScanner.importUserComponents()
    // then
    expect(importedPaths).toBeDefined()
    expect(importedPaths).toHaveLength(1)
    expect(importedPaths[0]).toEqual(undefined)
  })
})
