import {AxiosError} from 'axios'

export type GrowthBookApiError = {
  message: string
}

/**
 * Parses the Axios error object based on the GrowthBook public API error response
 * @param error {AxiosError}
 * @return error message {string}
 */
export const errorStringFromResponse = (error: unknown): string => {
  const defaultErrorMessage = 'unknown error'

  try {
    return (error as AxiosError<GrowthBookApiError>).response?.data?.message || defaultErrorMessage
  } catch {
    return defaultErrorMessage
  }
}
