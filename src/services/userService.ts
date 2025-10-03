import { prepareUserDataForAPI, createSafeJSON } from '@/lib/dataValidation'

export interface CreateUserRequest {
  name: string
  email: string
  phone: string
  position: string
  birthDate: string
  message: string
}

export interface CreateUserResponse {
  id: string
  name: string
  email: string
  phone: string
  position: string
  birthDate: string
  message: string
  createdAt: string
}

export async function createUser(userData: CreateUserRequest): Promise<CreateUserResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
  const url = `${baseUrl}/api/users`
  
  try {
    const validatedData = prepareUserDataForAPI(userData)
    const jsonString = createSafeJSON(validatedData)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: jsonString,
    })

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      
      try {
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } else {
          const textError = await response.text()
          errorMessage = textError || errorMessage
        }
      } catch (parseError) {
      }
      
      throw new Error(errorMessage)
    }

    const responseText = await response.text()
    const result = JSON.parse(responseText)
    return result
    
  } catch (error) {
    throw error
  }
}

/**
 * Hook personalizado para mutation de criação de usuário
 */
export const createUserMutationOptions = {
  mutationFn: createUser,
}