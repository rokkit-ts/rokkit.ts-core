import autoClassDeclaration from "@rokkit.ts/dependency-injection/lib/automatic-class-declaration/autoClassDeclaration";
import * as path from "path";

/**
 * @Class ComponentScanner
 * The Component scanner searches for all user created components and imports them.
 * This class is used internally to ensure that each class of the user is loaded and applied to the application.
 */
export class ComponentScanner {
  /**
   * @function importUserComponents
   * @returns Promise<void>
   * This function executes the import for the whole project.
   * The user components are retrieved by the autClassDeclaration singleton of the  dependency-injection module.
   */
  public static async importUserComponents(): Promise<(string | undefined)[]> {
    return Promise.all(
      autoClassDeclaration.ClassDeclarations.map(declaration =>
        autoClassDeclaration.isProd
          ? ComponentScanner.importUserComponent(
              declaration.compiledFilePath as string
            )
          : ComponentScanner.importUserComponent(declaration.sourceFilePath)
      )
    );
  }

  private static async importUserComponent(
    componentFilePath: string
  ): Promise<string | undefined> {
    try {
      const module = await import(path.resolve(componentFilePath));
      if (!module) {
        return Promise.resolve(undefined);
      }
      return Promise.resolve(componentFilePath);
    } catch (error) {
      return Promise.resolve(undefined);
    }
  }
}
