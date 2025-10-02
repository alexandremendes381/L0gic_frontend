/**
 * Funções de sanitização e validaexport function validateAndCleanData(userData: CreateUserRequest): CreateUserRequest {
  const cleaned: any = {}
  
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      // Garantir que o valor seja uma string válida e trimmed
      cleaned[key] = typeof value === 'string' ? value.trim() : String(value).trim()
    }
  })
  
  return cleaned as CreateUserRequest
}ra prevenir erros JSON e garantir dados válidos
 */

import { CreateUserRequest } from '@/services/userService'

/**
 * Sanitiza uma string removendo caracteres especiais e garantindo formato válido
 */
function sanitizeString(value: any): string {
  if (value === null || value === undefined) return ''
  
  const str = String(value).trim()
  // Remove caracteres de controle que podem quebrar JSON
  return str.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
}

/**
 * Sanitiza dados do usuário garantindo que todos os campos sejam strings válidas
 */
export function sanitizeUserData(userData: any): CreateUserRequest {
  const sanitized: CreateUserRequest = {
    name: sanitizeString(userData.name),
    email: sanitizeString(userData.email),
    phone: sanitizeString(userData.phone),
    position: sanitizeString(userData.position),
    birthDate: sanitizeString(userData.birthDate),
    message: sanitizeString(userData.message)
  }
  
  return sanitized
}

/**
 * Valida e limpa dados removendo campos vazios ou inválidos
 */
export function validateAndCleanData(userData: CreateUserRequest): CreateUserRequest {
  
  const cleaned: any = {}
  
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      // Garantir que o valor seja uma string válida e trimmed
      cleaned[key] = typeof value === 'string' ? value.trim() : String(value).trim()
    }
  })
  
  return cleaned as CreateUserRequest
}

/**
 * Valida campos obrigatórios e formatos
 */
export function validateUserData(userData: CreateUserRequest): void {
  // Verificar campos obrigatórios
  const required = ['name', 'email', 'phone', 'position', 'birthDate', 'message']
  const missing = required.filter(field => !userData[field as keyof CreateUserRequest])
  
  if (missing.length > 0) {
    throw new Error(`Campos obrigatórios: ${missing.join(', ')}`)
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userData.email)) {
    throw new Error('Email inválido')
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(userData.birthDate)) {
    throw new Error('Data deve estar no formato YYYY-MM-DD')
  }

  const maxLengths = {
    name: 100,
    email: 100,
    phone: 20,
    position: 100,
    birthDate: 10,
    message: 2000
  }
  
  Object.entries(maxLengths).forEach(([field, maxLength]) => {
    const fieldValue = userData[field as keyof CreateUserRequest]
    if (fieldValue && fieldValue.length > maxLength) {
      throw new Error(`Campo ${field} muito longo (máximo ${maxLength} caracteres)`)
    }
  })
}

/**
 * Cria JSON de forma segura com teste de parse
 */
export function createSafeJSON(data: any): string {
  try {
    const jsonString = JSON.stringify(data)
    // Testar se o JSON foi criado corretamente
    JSON.parse(jsonString)
    return jsonString
  } catch (jsonError) {
    throw new Error('Dados inválidos para JSON')
  }
}

/**
 * Função principal que sanitiza, valida e prepara dados para envio
 */
export function prepareUserDataForAPI(userData: any): CreateUserRequest {
  // 1. Sanitizar dados
  const sanitized = sanitizeUserData(userData)
  
  // 2. Limpar campos vazios
  const cleaned = validateAndCleanData(sanitized)
  
  // 3. Validar formato e campos obrigatórios
  validateUserData(cleaned)
  
  // 4. Testar criação do JSON
  createSafeJSON(cleaned)
  
  return cleaned
}