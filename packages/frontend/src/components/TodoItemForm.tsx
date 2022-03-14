import React, { useState, FormEvent, useRef } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import TodoItemInput from './TodoItemInput'
import { getFieldError } from '../helpers/formValidation'
import { TODO_LIST_API } from '../constants'
import { useSWRConfig } from 'swr'
import axios from 'axios'

export default function TodoItemForm(): React.ReactElement {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false)
  const [responseError, setResponseError] = useState<string>('')
  const form = useRef<HTMLFormElement>(null)
  const { mutate } = useSWRConfig()

  const createTodoItem = async (description: string | FormDataEntryValue): Promise<void> => {
    try {
      await axios.post(TODO_LIST_API.DEV_URL, { description, isCompleted: false })
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error?.response?.data === 'string') {
        setResponseError(error.response.data)
      }
    }
  }

  const clearResponseError = (): void => setResponseError('')

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())
    const formIsValid = Object.values(fieldValues).every((value) => typeof value === 'string' && !getFieldError(value))

    if (formIsValid) {
      setWasSubmitted(true)
      createTodoItem(fieldValues.description)
      mutate(TODO_LIST_API.DEV_URL)
      form.current?.reset()
    }
  }

  return (
    <Box marginBottom={20} paddingX={6}>
      <form noValidate onSubmit={handleSubmit} ref={form}>
        <HStack justifyContent="space-between">
          <TodoItemInput
            label="Add todo item"
            name="description"
            placeholder="Description..."
            wasSubmitted={wasSubmitted}
            responseError={responseError}
            clearResponseError={clearResponseError}
          />
          <Button
            type="submit"
            color="white"
            background="brand.vividOrange"
            borderRadius={0}
            border="1px solid transparent"
            _hover={{
              background: 'transparent',
              color: 'brand.vividOrange',
              borderColor: 'brand.vividOrange',
            }}
          >
            Add item
          </Button>
        </HStack>
      </form>
    </Box>
  )
}
