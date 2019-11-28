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
  public async importUserComponents(): Promise<void> {
    await Promise.all(
      autoClassDeclaration.ClassDeclarations.map(declaration =>
        this.importUserComponent(declaration.filePath)
      )
    );
    return Promise.resolve();
  }

  private async importUserComponent(componentFilePath: string): Promise<void> {
    const module = await import(path.resolve(componentFilePath));
    if (!module) {
      return Promise.reject();
    }
    return Promise.resolve();
  }
}
