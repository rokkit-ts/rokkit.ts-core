import * as path from 'path'
import { TypeScannerSingleton } from '@rokkit.ts/dependency-injection'

/**
 * @Class ComponentScanner
 * The Component scanner searches for all user created components and imports them.
 * This class is used internally to ensure that each class of the user is loaded and applied to the application.
 */
export class ComponentScanner {
  /**
   * @function importUserComponents
   * @returns Promise<(string | undefined)[]>
   * This function executes the import for the whole project.
   * The user components are retrieved by the TypeScanner singleton of the dependency-injection module.
   */
  public static async importUserComponents(): Promise<(string | undefined)[]> {
    return Promise.all(
      TypeScannerSingleton.pathsOfUserComponents().map(componentPath =>
        ComponentScanner.importUserComponent(componentPath)
      )
    )
  }

  private static async importUserComponent(
    componentFilePath: string
  ): Promise<string | undefined> {
    try {
      const module = await import(path.resolve(componentFilePath))
      if (!module) {
        return Promise.resolve(undefined)
      }
      return Promise.resolve(componentFilePath)
    } catch (error) {
      // log all errors these are very important!
      console.log(error)

      return Promise.resolve(undefined)
    }
  }
}
