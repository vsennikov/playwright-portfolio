import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

test.describe('Login Functionality', () => {

	let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.open('/auth/login')
  })
  
  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01')
   
	await expect(page).toHaveURL(/account/)
    await expect(page.locator('h1')).toContainText('My account')
  })

  test('should show error with invalid password', async ({ page }) => {
    await loginPage.login('customer@practicesoftwaretesting.com', 'wrong_password')
    
	const error = await loginPage.getErrorMessageText()
    expect(error).toContain('Invalid email or password')
  })

  test('should toggle password visibility when clicking the "eye" icon', async () => {
    await loginPage.passwordInput.fill('SecretPass123')

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password')
    await loginPage.clickShowPassword()
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text')
    await loginPage.clickShowPassword()
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password')
  })


    test('should show error with invalid email format', async ({ page }) => {
    await loginPage.emailInput.fill("invalid_format_gmail_com")
	await loginPage.loginButton.click()

    const error = await loginPage.getEmailErrorMessageText()
    expect(error).toContain('Email format is invalid')
  })

    test('should show errors with email & password required', async ({ page }) => {
	await loginPage.loginButton.click()

    const emailError = await loginPage.getEmailErrorMessageText()
	const passwordError = await loginPage.getPasswordErrorMessageText()
    expect(emailError).toContain('Email is required')
    expect(passwordError).toContain('Password is required')
	
  })

	test('should navigate to "Forgot Password" page', async ({ page }) => {
    await loginPage.clickForgotPassword()

    await expect(page).toHaveURL('auth/forgot-password')
    await expect(page.locator('h3')).toContainText('Forgot Password')
  })

	test('should navigate to "Registration" page', async ({ page }) => {
    await loginPage.clickRegister()

	await expect(page).toHaveURL('auth/register')
    await expect(page.locator('h3')).toContainText('Customer registration')
  })
})