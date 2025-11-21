import { test, expect, APIRequestContext } from '@playwright/test'
import {
  UserRequest,
  UserResponse,
  TokenResponse,
  ProductResponse,
  PaginatedProductResponse,
  CartCreatedResponse,
  CartItemAddedResponse,
} from './apiUtils/models'
import { API_BASE_URL, generateUniqueEmail, generateValidPassword } from './apiUtils/utils'

test.describe('API Tests', () => {
  let request: APIRequestContext

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: API_BASE_URL,
    })
  })

  test.afterAll(async () => {
    await request.dispose()
  })

  test('TC-API-001: User Registration - POST /users/register', async () => {
    const email = generateUniqueEmail()
    const password = generateValidPassword()

    const userData: UserRequest = {
      first_name: 'John',
      last_name: 'Doe',
      email: email,
      password: password,
      dob: '1990-01-01',
    }

    await test.step('Send registration request', async () => {
      const response = await request.post('/users/register', {
        data: userData,
      })

      await test.step('Verify status code is 201', async () => {
        expect(response.status()).toBe(201)
      })

      await test.step('Verify response contains user id', async () => {
        const responseBody: UserResponse = await response.json()
        expect(responseBody).toHaveProperty('id')
        expect(typeof responseBody.id).toBe('string')
        expect(responseBody.id.length).toBeGreaterThan(0)
        expect(responseBody.email).toBe(email)
        expect(responseBody.first_name).toBe('John')
        expect(responseBody.last_name).toBe('Doe')
      })
    })
  })

  test('TC-API-002: User Login - POST /users/login', async () => {
    let userEmail = ''
    let userPassword = ''

    await test.step('Create a new user for login test', async () => {
      userEmail = generateUniqueEmail()
      userPassword = generateValidPassword()

      const userData: UserRequest = {
        first_name: 'Jane',
        last_name: 'Smith',
        email: userEmail,
        password: userPassword,
      }

      const createResponse = await request.post('/users/register', {
        data: userData,
      })
      expect(createResponse.status()).toBe(201)
    })

    await test.step('Login with created credentials', async () => {
      const loginResponse = await request.post('/users/login', {
        data: {
          email: userEmail,
          password: userPassword,
        },
      })

      await test.step('Verify status code is 200', async () => {
        expect(loginResponse.status()).toBe(200)
      })

      await test.step('Verify response contains access token', async () => {
        const responseBody: TokenResponse = await loginResponse.json()
        expect(responseBody).toHaveProperty('access_token')
        expect(typeof responseBody.access_token).toBe('string')
        expect(responseBody.access_token.length).toBeGreaterThan(0)
        expect(responseBody.token_type).toBe('bearer')
        expect(responseBody).toHaveProperty('expires_in')
        expect(typeof responseBody.expires_in).toBe('number')
      })
    })
  })

  test.describe('TC-API-003: Product Search & Filtering - GET /products', () => {
    test('Scenario A: Sort products by price descending', async () => {
      await test.step('Send request with sort=price,desc', async () => {
        const response = await request.get('/products', {
          params: {
            sort: 'price,desc',
          },
        })

        await test.step('Verify status code is 200', async () => {
          expect(response.status()).toBe(200)
        })

        await test.step('Verify products are sorted by price descending', async () => {
          const responseBody: PaginatedProductResponse = await response.json()
          expect(responseBody).toHaveProperty('data')
          expect(Array.isArray(responseBody.data)).toBe(true)

          if (responseBody.data.length >= 2) {
            const firstPrice = responseBody.data[0].price
            const secondPrice = responseBody.data[1].price
            expect(firstPrice).toBeGreaterThanOrEqual(secondPrice)
          } else {
            // If less than 2 products, test is still valid but cannot verify sorting
            expect(responseBody.data.length).toBeGreaterThan(0)
          }
        })
      })
    })

    test('Scenario B: Filter products by price range', async () => {
      const minPrice = 1
      const maxPrice = 50

      await test.step(`Send request with between=price,${minPrice},${maxPrice}`, async () => {
        const response = await request.get('/products', {
          params: {
            between: `price,${minPrice},${maxPrice}`,
          },
        })

        await test.step('Verify status code is 200', async () => {
          expect(response.status()).toBe(200)
        })

        await test.step('Verify all products are within the price range', async () => {
          const responseBody: PaginatedProductResponse = await response.json()
          expect(responseBody).toHaveProperty('data')
          expect(Array.isArray(responseBody.data)).toBe(true)

          if (responseBody.data.length > 0) {
            for (const product of responseBody.data) {
              expect(product.price).toBeGreaterThanOrEqual(minPrice)
              expect(product.price).toBeLessThanOrEqual(maxPrice)
            }
          }
        })
      })
    })
  })

  test('TC-API-004: Shopping Cart Flow - POST /carts and POST /carts/{id}', async () => {
    let cartId = ''
    let productId = ''

    await test.step('Step 1: Create a new cart', async () => {
      const createCartResponse = await request.post('/carts')

      await test.step('Verify cart creation returns status 201', async () => {
        expect(createCartResponse.status()).toBe(201)
      })

      await test.step('Capture cart id from response', async () => {
        const cartResponse: CartCreatedResponse = await createCartResponse.json()
        expect(cartResponse).toHaveProperty('id')
        expect(typeof cartResponse.id).toBe('string')
        cartId = cartResponse.id
      })
    })

    await test.step('Step 2: Fetch a valid product ID', async () => {
      const productsResponse = await request.get('/products')
      expect(productsResponse.status()).toBe(200)
      const productsBody: PaginatedProductResponse = await productsResponse.json()
      
      if (productsBody.data.length > 0) {
        productId = productsBody.data[0].id
      } else {
        // Fallback to example product ID if no products available
        productId = '01HHJC7RERZ0M3VDGS6X9HM33A'
      }
    })

    await test.step('Step 3: Add item to cart', async () => {
      const addItemResponse = await request.post(`/carts/${cartId}`, {
        data: {
          product_id: productId,
          quantity: 1,
        },
      })

      await test.step('Verify item addition returns status 200', async () => {
        expect(addItemResponse.status()).toBe(200)
      })

      await test.step('Verify response confirms item was added', async () => {
        const itemResponse: CartItemAddedResponse = await addItemResponse.json()
        expect(itemResponse).toHaveProperty('result')
        expect(typeof itemResponse.result).toBe('string')
        expect(itemResponse.result.toLowerCase()).toContain('item added')
      })
    })
  })
})

