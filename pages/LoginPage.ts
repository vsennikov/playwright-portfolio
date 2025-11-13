import { Page, Locator } from '@playwright/test'
import { BasePage } from './components/BasePage'

export class LoginPage extends BasePage {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly showPasswordButton: Locator
  readonly emailErrorMessage: Locator
  readonly registerLink: Locator
  readonly forgotPasswordLink: Locator
  readonly passwordErrorMessage: Locator

  constructor(page: Page) {
    super(page)
    this.emailInput = page.locator('[data-test="email"]')
    this.passwordInput = page.locator('[data-test="password"]')
    this.loginButton = page.locator('[data-test="login-submit"]')
	this.showPasswordButton = page.locator('.input-group-append button')
	this.emailErrorMessage = page.locator('[data-test="login-error"]')
	this.emailErrorMessage = page.locator('[data-test="email-error"]')
	this.registerLink = page.locator('[data-test="register-link"]')
	this.forgotPasswordLink = page.locator('[data-test="forgot-password-link"]')
	this.passwordErrorMessage = page.locator('[data-test="password-error"]')
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(pass)
    await this.loginButton.click()
  }

  async clickShowPassword() {
    await this.showPasswordButton.click()
  }

  async clickRegister() {
    await this.registerLink.click()
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click()
  }

  async getErrorMessageText() {
    await this.emailErrorMessage.waitFor({ state: 'visible' })
    return await this.emailErrorMessage.innerText()
  }

  async getEmailErrorMessageText() {
	await this.emailErrorMessage.waitFor({state: 'visible'})
	return await this.emailErrorMessage.innerText()
  }

    async getPasswordErrorMessageText() {
	await this.passwordErrorMessage.waitFor({state: 'visible'})
	return await this.passwordErrorMessage.innerText()
  }
}