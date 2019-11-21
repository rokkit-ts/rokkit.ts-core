import autoClassDeclaration from "@rokkit.ts/dependency-injection/lib/automatic-class-declaration/autoClassDeclaration";
import * as path from "path";

export class ComponentScanner {
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
