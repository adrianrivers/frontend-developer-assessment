import { render, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import TodoItemsTable from '../TodoItemsTable'
import { TodoItem } from '../../types'

const TodoItemsMock: TodoItem[] = [
  {
    id: 1,
    description: 'Buy milk',
    isCompleted: false,
  },
  {
    id: 2,
    description: 'Buy cheese',
    isCompleted: false,
  },
]

const handleMarkAsCompletedMock = jest.fn()

describe('TodoItemsTable', () => {
  it('should NOT render a table of todo items if none are passed to the component', () => {
    const { container } = render(<TodoItemsTable todoItems={[]} handleMarkAsCompleted={handleMarkAsCompletedMock} />)

    expect(container.querySelector('table')).toBeNull()
    expect(container).toMatchSnapshot()
  })

  it('should render a TodoItemsTable component', async () => {
    const { container, getByText, queryByText, getAllByText } = render(
      <TodoItemsTable todoItems={TodoItemsMock} handleMarkAsCompleted={handleMarkAsCompletedMock} />
    )
    const markAsCompletedButtons = getAllByText('Mark as completed') as HTMLButtonElement[]

    getByText(TodoItemsMock[0].description)
    expect(markAsCompletedButtons.length).toBe(2)

    fireEvent.click(markAsCompletedButtons[0])

    waitFor(() => {
      expect(queryByText(TodoItemsMock[0].description)).toBe(null)
      expect(getByText('Woohoo', { exact: false })).toBeInTheDocument()
    })

    expect(handleMarkAsCompletedMock).toHaveBeenCalledTimes(1)
    expect(handleMarkAsCompletedMock).toHaveBeenCalledWith(TodoItemsMock[0].id, TodoItemsMock[0].description)
    expect(container).toMatchSnapshot()
  })
})
