import * as fs from 'fs-extra'
import * as path from 'path'

// TODO: use a normal map instead of a building a new type for this.
interface PackageDependencies {
  [moduleName: string]: string
}

/**
 * @class PackageScanner
 * This class scans a package.json to analyse its dependencies.
 */
export class PackageScanner {
  private readonly packageDependencies: PackageDependencies

  constructor(pathToUserPackageJson?: string) {
    this.packageDependencies = PackageScanner.scanPackageJson(
      pathToUserPackageJson || './package.json'
    )
  }

  private static scanPackageJson(
    pathToUserPackageJson: string
  ): PackageDependencies {
    const clearPath = path.resolve(pathToUserPackageJson)
    const fileData = fs.readFileSync(clearPath, { encoding: 'utf8' })
    const packageJsonData = JSON.parse(fileData)
    return packageJsonData.dependencies ? packageJsonData.dependencies : {}
  }

  /**
   * @function isPackageInstalled
   * @param packageName
   * @returns boolean
   * Checks if a specific package is present on the package.json dependencies.
   */
  public isPackageInstalled(packageName: string): boolean {
    return this.packageDependencies[packageName] !== undefined
  }
}
