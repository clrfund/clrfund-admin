import { expect, it } from 'vitest'

it('same addresses', () => {
  const address = '0x78a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  expect(isAddressEqual(address, address)).to.eq(true)
})

it('different addresses', () => {
  const address = '0x78a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  const address2 = '0x28a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  expect(isAddressEqual(address, address2)).to.eq(false)
})

it('1 address is undefined', () => {
  const address = '0x78a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  const address2 = undefined
  expect(isAddressEqual(address, address2)).to.eq(false)
})

it('both addresses are undefined', () => {
  const address2 = undefined
  expect(isAddressEqual(address2, address2)).to.eq(false)
})

it('both addresses are empty strings', () => {
  const address2 = ''
  expect(isAddressEqual(address2, address2)).to.eq(false)
})

it('1 address is empty strings', () => {
  const address = '0x78a3bce2b6E6132Fe773E1379DCcEdBd8911FE59'
  const address2 = ''
  expect(isAddressEqual(address, address2)).to.eq(false)
})
