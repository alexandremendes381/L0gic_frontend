import { TrackingInfo } from '@/hooks/useTracking'
import { FormData } from '@/lib/validation'
import { CreateUserRequest } from '@/services/userService'

export function mapFormDataToApiRequest(
  formData: FormData, 
  trackingData?: TrackingInfo
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