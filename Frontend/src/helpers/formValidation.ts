export function getFieldError(value: string | undefined): string {
  if (!value) return 'Field is required'

  const valueIsLongEnough = value.length >= 3
  const valueIsShortEnough = value.length <= 100

  if (!valueIsLongEnough) {
    return 'Value must be at least 3 characters long 👮'
  } else if (!valueIsShortEnough) {
    return 'Value must be no longer than 100 characters 🛑'
  }

  return ''
}

const responseErrorMessageMap: { [responseError: string]: string } = Object.freeze({
  'description already exists': "That todo item already exists, don't enter the same todo item more than once 🚨",
})

export function getResponseError(responseError: string): string {
  const sanitisedResponseError = responseError.toLocaleLowerCase()

  if (responseErrorMessageMap[sanitisedResponseError]) {
    return responseErrorMessageMap[sanitisedResponseError]
  }

  return ''
}
