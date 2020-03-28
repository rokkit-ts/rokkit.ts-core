import { PackageScanner } from './packageScanner'
import { readFileSync } from 'fs-extra'
import * as path from 'path'

jest.mock('fs-extra', () => ({
  readFileSync: jest.fn()
}))

describe('PackageScanner', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    ;(readFileSync as jest.Mock).mockReturnValue(
      '{ "dependencies": { "@rokkit.ts/abstract-module": "^0.1.8","@rokkit.ts/class-declaration-resolver": "^0.2.1","@rokkit.ts/dependency-injection": "^0.3.2"} }'
    )
  })

  it('should return true when a package is installed', () => {
    // given
    const packageScanner = new PackageScanner('./package.json')
    const expectedIsInstalled = true
    // when
    const actualIsInstalled = packageScanner.isPackageInstalled(
      '@rokkit.ts/abstract-module'
    )
    // then
    expect(readFileSync).toHaveBeenCalledTimes(1)
    expect(readFileSync).toHaveBeenCalledWith(path.resolve('./package.json'), {
      encoding: 'utf8'
    })
    expect(actualIsInstalled).toEqual(expectedIsInstalled)
  })

  it('should return false when a packe is not installed', () => {
    // given
    const packageScanner = new PackageScanner('./package.json')
    const expectedIsInstalled = false
    // when
    const actualIsInstalled = packageScanner.isPackageInstalled(
      '@rokkit.ts/abs'
    )
    // then
    expect(readFileSync).toHaveBeenCalledTimes(1)
    expect(readFileSync).toHaveBeenCalledWith(path.resolve('./package.json'), {
      encoding: 'utf8'
    })
    expect(actualIsInstalled).toEqual(expectedIsInstalled)
  })
})
