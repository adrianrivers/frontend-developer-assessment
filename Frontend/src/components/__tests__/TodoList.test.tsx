import React from 'react'
import { render, waitFor, act } from '@testing-library/react'
import axios from 'axios'
import TodoList, { TodoItem } from '../TodoList'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const TodoItemsMock: TodoItem[] = [
  {
    id: '1',
    description: 'Buy milk',
    isCompleted: false,
  },
  {
    id: '2',
    description: 'Buy cheese',
    isCompleted: false,
  },
]

describe('TodoList', () => {
  afterEach(() => {
    mockedAxios.get.mockClear()
  })

  it('should NOT render a table containing todo items if none returned in response', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {},
    })

    const { container, getByText } = render(<TodoList />)

    getByText('You currently have no todo items in your todo list', { exact: false })
    expect(container).toMatchSnapshot()
  })

  it('should render a table containing todo items if todo items are returned in response', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [...TodoItemsMock],
    })

    const { container } = render(<TodoList />)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve))
    })

    await waitFor(() => {
      expect(container).toMatchSnapshot()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })
  })

  it('should update the table to contain a newly posted todo item', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [...TodoItemsMock],
    })

    const { container } = render(<TodoList />)

    /**
     * We need to wait a second for the component to rerender
     * after the axios call
     */
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve))
    })

    await waitFor(() => {
      expect(container).toMatchSnapshot()
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    })
  })
})
