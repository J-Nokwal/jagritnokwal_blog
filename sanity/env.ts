export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-12'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const PREVIEW_MODE_ROUTE = '/api/draft-mode/enable'
export const readToken = process.env.SANITY_API_READ_TOKEN || ''
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || ''
export const useCdn = false
export const studioUrl = '/studio'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
