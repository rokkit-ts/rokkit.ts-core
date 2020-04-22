import * as fs from 'fs-extra'
import * as path from 'path'
import { LoggerFactory } from '@rokkit.ts/logger'

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
  private readonly logger = LoggerFactory.create('PackageScanner', true)
  private readonly defaultPath = './package.json'

  constructor(pathToUserPackageJson?: string) {
    this.packageDependencies = this.scanPackageJson(
      pathToUserPackageJson || this.defaultPath
    )
  }

  /**
   * @function isPackageInstalled
   * @param packageName
   * @returns boolean
   * Checks if a specific package is present on the package.json dependencies.
   */
  public isPackageInstalled(packageName: string): boolean {
    const packageInstalled = this.packageDependencies[packageName] !== undefined
    packageInstalled
      ? this.logger.debug(`${packageName} is installed`)
      : this.logger.warn(`${packageName} is not installed`)

    return packageInstalled
  }

  private scanPackageJson(pathToUserPackageJson: string): PackageDependencies {
    const clearPath = path.resolve(pathToUserPackageJson)
    this.logger.debug(`Scanning package.json for path: ${clearPath}`)
    try {
      const fileData = fs.readFileSync(clearPath, { encoding: 'utf8' })
      const packageJsonData = JSON.parse(fileData)
      return packageJsonData.dependencies ? packageJsonData.dependencies : {}
    } catch (error) {
      this.logger.error(`Scanning package.json resolved in an error: ${error}`)
      throw new Error(error.message)
    }
  }
}
