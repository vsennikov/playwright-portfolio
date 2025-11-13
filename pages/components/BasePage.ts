import { Page, Locator } from '@playwright/test'

export class BasePage {
  readonly page: Page
  readonly headerLogo: Locator

  constructor(page: Page) {
    this.page = page
    this.headerLogo = page.locator('.navbar-brand')
  }

  async open(path: string = '/') {
    await this.page.goto(path)
  }
  
  async waitForUrl(urlPart: string) {
      await this.page.waitForURL(`**/${urlPart}`)
  }
}