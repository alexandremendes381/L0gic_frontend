import { FormData } from '@/lib/validation'
import { CreateUserRequest } from '@/services/userService'
import { TrackingData } from '@/hooks/useTracking'

export function mapFormDataToApiRequest(
  formData: FormData, 
  trackingData?: TrackingData
): CreateUserRequest {
  return {
    name: formData.nome,
    email: formData.email,
    phone: formData.telefone,
    position: formData.cargo,
    birthDate: formData.dataNascimento,
    message: `${formData.mensagem}${trackingData ? `\n\nDados de tracking:\n${JSON.stringify(trackingData, null, 2)}` : ''}`,
  }
}

export interface FormSubmissionState {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
}