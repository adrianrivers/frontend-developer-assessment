export function getFieldError(value: string | undefined): string | null {
  if (!value) return 'Field is required'

  const valueIsLongEnough = value.length >= 3
  const valueIsShortEnough = value.length <= 100

  if (!valueIsLongEnough) {
    return 'Value must be at least 3 characters long 👮'
  } else if (!valueIsShortEnough) {
    return 'Value must be no longer than 100 characters 🛑'
  }

  return null
}

const responseErrorMessageMap: { [responseError: string]: string } = Object.freeze({
  'description already exists': "Don't use the same description twice 🚨",
})

export function getResponseError(responseError: string): string | null {
  const sanitisedResponseError = responseError.toLocaleLowerCase()

  if (responseErrorMessageMap[sanitisedResponseError]) {
    return responseErrorMessageMap[sanitisedResponseError]
  }

  return null
}
