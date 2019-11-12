import * as fs from "fs-extra";
import * as path from "path";

interface PackageDependencies {
  [moduleName: string]: string;
}

export class PackageScanner {
  private readonly packageDependencies: PackageDependencies;

  public constructor(pathToUserPackageJson?: string) {
    this.packageDependencies = PackageScanner.scanPackagesOnPackageJson(
      pathToUserPackageJson || "./package.json"
    );
  }

  public isPackageInstalled(packageName: string): boolean {
    return this.packageDependencies[packageName] !== undefined;
  }

  private static scanPackagesOnPackageJson(
    pathToUserPackageJson: string
  ): PackageDependencies {
    const clearPath = path.resolve(pathToUserPackageJson);
    const fileData = fs.readFileSync(clearPath);
    const packageJsonData = JSON.parse(fileData.toString());
    return packageJsonData.dependencies ? packageJsonData.dependencies : {};
  }
}
