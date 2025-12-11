import { APIRequestContext, expect } from '@playwright/test'
import { generateUniqueEmail, generateValidPassword } from './utils'
import { UserRequest } from './models'

export interface TestUser {
	email: string
	password: string
	firstName: string
	lastName: string
	id?: string
}

export async function createTestUser(request: APIRequestContext): Promise<TestUser> {
	const password = generateValidPassword()
	const email = generateUniqueEmail()
	const firstName = 'Test'
	const lastName = 'User'

	const userData: UserRequest = {
		first_name: firstName,
		last_name: lastName,
		email: email,
		password: password,
		dob: '1990-01-01',
	}

	const response = await request.post('/users/register', {
		data: userData,
	})

	expect(response.status(), 'Failed to create test user').toBe(201)

	return {
		email,
		password,
		firstName,
		lastName
	}
}
