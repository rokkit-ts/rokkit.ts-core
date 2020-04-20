import { Rokkit } from './Rokkit'
import { RokkitModules } from '../modules'
import { starter } from './Starter'

jest.mock('./Starter', () => ({ starter: { run: jest.fn() } }))
describe('Rokkit', () => {
  it('should return ModuleBuilder for a RokkitModule', () => {
    // given/when
    const builder = Rokkit.useModule(RokkitModules.WEB)
    // then
    expect(builder).toBeDefined()
  })
  it('should run the starter when calling run', () => {
    // given
    // when
    Rokkit.run()
    // then
    expect(starter.run).toHaveBeenCalledTimes(1)
  })
})
