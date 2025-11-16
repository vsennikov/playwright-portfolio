import fs from 'fs'
import path from 'path'

export type Credentials = { email: string; password: string }

const credsPath = path.join(process.cwd(), 'test-results', 'credentials.json')

export function saveCredentials(creds: Credentials) {
  const dir = path.dirname(credsPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(credsPath, JSON.stringify(creds, null, 2), 'utf-8')
}

export function loadCredentials(): Credentials | null {
  try {
    const raw = fs.readFileSync(credsPath, 'utf-8')
    return JSON.parse(raw) as Credentials
  } catch {
    return null
  }
}

export function hasCredentials(): boolean {
  return fs.existsSync(credsPath)
}


