import { expect, it } from 'vitest'

it('same addresses', () => {
  const address = '0x78a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  expect(isAddressEqual(address, address)).to.eq(true)
})
