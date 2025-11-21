import { faker } from '@faker-js/faker'

export function generateUniqueEmail(): string {
  return faker.internet.email()
}

export function generateValidPassword(): string {
  const word = faker.word.adjective().replace(/[^a-zA-Z]/g, '') || 'Valid'
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  const number = faker.string.numeric(3)
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%', '^', '&', '*'])
  const extra = faker.string.alphanumeric(2).toLowerCase()
  return `${capitalized}${number}${special}${extra}`
}

export const API_BASE_URL = 'https://api.practicesoftwaretesting.com'

