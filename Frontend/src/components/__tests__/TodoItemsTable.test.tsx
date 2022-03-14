import { render, waitFor, act } from '@testing-library/react'
import React from 'react'
import TodoItemsTable from '../TodoItemsTable'
import { TodoItem } from '../../types'
import axios from 'axios'

const TODO_ITEMS_MOCK: TodoItem[] = [
  {
    id: '1',
    description: 'Buy milk',
    isCompleted: false,
  },
  {
    id: '2',
    description: 'Pay bills',
    isCompleted: true,
  },
]

describe('TodoItemsTable', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should NOT render a table of todo items if none are passed to the component', () => {
    const { container, getByText } = render(<TodoItemsTable />)

    getByText('You currently have no todo items in your todo list 🙂')
    expect(container.querySelector('table')).toBeNull()
    expect(container).toMatchSnapshot()
  })

  it('should render a TodoItemsTable component', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: [...TODO_ITEMS_MOCK],
    })

    const { container, getByText, queryAllByText } = render(<TodoItemsTable />)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve))
    })

    await waitFor(() => {
      const markAsCompleteButtons = queryAllByText('Mark as completed')
      const completedTodoItems = queryAllByText('Woohoo 🥳')

      getByText(TODO_ITEMS_MOCK[0].description)
      getByText(TODO_ITEMS_MOCK[1].description)

      expect(markAsCompleteButtons.length).toBe(1)
      expect(completedTodoItems.length).toBe(1)

      expect(container).toMatchSnapshot()
    })
  })
})
