export interface UserRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  dob?: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    postal_code?: string
  }
}

export interface UserResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  dob?: string
  phone?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    postal_code?: string
  }
  created_at?: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

export interface ProductResponse {
  id: string
  name: string
  price: number
  description?: string
  category?: CategoryResponse
  brand?: BrandResponse
  product_image?: ImageResponse
  in_stock?: boolean
  is_rental?: boolean
  is_location_offer?: boolean
  co2_rating?: string
  is_eco_friendly?: boolean
}

export interface PaginatedProductResponse {
  current_page: number
  data: ProductResponse[]
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface CartCreatedResponse {
  id: string
}

export interface CartItemAddedResponse {
  result: string
}

export interface BrandResponse {
  id: string
  name: string
  slug: string
}

export interface CategoryResponse {
  id: string
  parent_id?: string
  name: string
  slug: string
  sub_categories?: CategoryResponse[]
}

export interface ImageResponse {
  id: string
  file_name?: string
  title?: string
  by_name?: string
  by_url?: string
  source_name?: string
  source_url?: string
}

