import { test, expect } from '@playwright/test'
import { RegistrationPage } from '../pages/RegistrationPage'
import { saveCredentials } from './utils/credentials'

test.describe('Registration Page', () => {
  let registrationPage: RegistrationPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    await registrationPage.open('/auth/register')
    await expect(page.locator('h3')).toContainText('Customer registration')
  })

  test('should show field-level errors when submitting empty form', async ({ page }) => {
    await registrationPage.submit()

    // Verify specific error locators exist and become visible
    await expect(registrationPage.firstNameError).toBeVisible()
    await expect(registrationPage.lastNameError).toBeVisible()
    await expect(registrationPage.emailError).toBeVisible()
    await expect(registrationPage.passwordError).toBeVisible()

    // Error text should not be empty (don’t assert exact copy to avoid flakiness)
    await expect(registrationPage.firstNameError).toHaveText(/.+/)
    await expect(registrationPage.lastNameError).toHaveText(/.+/)
    await expect(registrationPage.emailError).toHaveText(/.+/)
    await expect(registrationPage.passwordError).toHaveText(/.+/)
  })

  test('should register successfully with valid data (happy path)', async ({ page }) => {
    const uniqueEmail = `playwright_${Date.now()}@example.com`
    const password = 'Random_password_1!'

    await registrationPage.fillBasicInfo({
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: '123 Main St',
      postalCode: '12345',
      city: 'Springfield',
      state: 'IL',
      country: 'Austria',
      phone: '1234567890',
      email: uniqueEmail,
      password,
    })

    await registrationPage.submit()

    // Site behavior: may redirect to account or login. Accept either to avoid brittleness.
    await expect(page).toHaveURL(/(account|auth\/login)/)

    // Persist credentials for subsequent tests (e.g., login)
    saveCredentials({ email: uniqueEmail, password })
  })
})


