import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'
import { saveCredentials } from './utils/credentials'
import { generateUniqueEmail, generateValidPassword } from './apiUtils/utils'
import { faker } from '@faker-js/faker'

test.describe('Registration - based on RegistrationTestCases.md', () => {
  let registrationPage: RegistrationPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    await registrationPage.open('/auth/register')
    await expect(page.locator('h3')).toContainText('Customer registration')
  })

  async function fillWithBaselineValidData(page: RegistrationPage, overrides?: Partial<Parameters<RegistrationPage['fillBasicInfo']>[0]>) {
    const base = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: faker.date.birthdate({ min: 18, max: 75, mode: 'age' }).toISOString().split('T')[0],
      street: faker.location.streetAddress(),
      postalCode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      country: 'Austria',
      phone: faker.phone.number().replace(/[^0-9]/g, '').slice(0, 10),
      email: generateUniqueEmail(),
      password: generateValidPassword(),
    }
    await page.fillBasicInfo({ ...base, ...(overrides || {}) })
    return { ...base, ...(overrides || {}) }
  }

  // TC-REG-001: Successful registration with all valid data
  test('TC-REG-001 - successful registration with all valid data', async ({ page }) => {
    const email = generateUniqueEmail()
    const password = generateValidPassword()
    await fillWithBaselineValidData(registrationPage, { email, password })
    await registrationPage.submit()
    await expect(page).toHaveURL(/(account|auth\/login)/)
    saveCredentials({ email, password })
  })

  // TC-REG-002: Attempt registration with all empty fields
  test('TC-REG-002 - empty submission shows validation errors', async () => {
    await registrationPage.submit()
    await expect(registrationPage.firstNameError).toBeVisible()
    await expect(registrationPage.lastNameError).toBeVisible()
    await expect(registrationPage.emailError).toBeVisible()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-003: Missing mandatory field (Email)
  test('TC-REG-003 - missing email shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage)
    await registrationPage.emailInput.fill('')
    await registrationPage.submit()
    await expect(registrationPage.emailError).toBeVisible()
  })

  // TC-REG-004: Invalid email format (no "@")
  test('TC-REG-004 - invalid email without "@" shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { email: 'test.user.com' })
    await registrationPage.submit()
    await expect(registrationPage.emailError).toBeVisible()
  })

  // TC-REG-005: Invalid email format (no domain)
  test('TC-REG-005 - invalid email without domain shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { email: 'test.user@test' })
    await registrationPage.submit()
    await expect(registrationPage.emailError).toBeVisible()
  })

  // TC-REG-006: Password too short
  test('TC-REG-006 - password too short shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { password: 'Ab1!' }) // 4 chars
    await registrationPage.submit()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-007: Valid password at minimum length (Boundary) - success
  test('TC-REG-007 - successful registration with minimum valid password length', async ({ page }) => {
    const email = generateUniqueEmail()
    const password = 'Vali953!'
    await fillWithBaselineValidData(registrationPage, { email, password })
    await registrationPage.submit()
    await expect(page).toHaveURL(/(account|auth\/login)/)
  })

  // TC-REG-008: Password missing uppercase
  test('TC-REG-008 - password missing uppercase shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { password: 'validpass123!' })
    await registrationPage.submit()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-009: Password missing lowercase
  test('TC-REG-009 - password missing lowercase shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { password: 'VALIDPASS123!' })
    await registrationPage.submit()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-010: Password missing number
  test('TC-REG-010 - password missing number shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { password: 'ValidPass!' })
    await registrationPage.submit()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-011: Password missing special character
  test('TC-REG-011 - password missing special character shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { password: 'ValidPass123' })
    await registrationPage.submit()
    await expect(registrationPage.passwordError).toBeVisible()
  })

  // TC-REG-012: Existing email
  test('TC-REG-012 - using an existing email shows validation error', async () => {
    await fillWithBaselineValidData(registrationPage, { email: 'customer@practicesoftwaretesting.com' })
    await registrationPage.submit()
    await expect(registrationPage.registerError).toBeVisible()
    await expect(registrationPage.registerError).toHaveText(/A customer with this email address already exists\./)
  })
})

