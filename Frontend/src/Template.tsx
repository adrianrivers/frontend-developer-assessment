/* eslint-disable */

import './App.css'
import React from 'react'
import type { ChangeEvent } from 'react'
import FormInput from './components/FormInput'
import axios from 'axios'
const TODOLIST_API_BASE_URL = 'http://localhost:7000'

function App() {
  const [description, setDescription] = React.useState('')
  const [items, setItems] = React.useState([])
  const [wasSubmitted, setWasSubmitted] = React.useState<boolean>(false)

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    // todo
  }

  async function getItems() {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ description: 'test foo', isCompleted: false }),
    // }

    console.log(fieldValues)
    // send the request
    axios
      .post(`${TODOLIST_API_BASE_URL}/api/todoItems`, {
        description: 'Fred',
        isCompleted: false,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    setWasSubmitted(true)
  }

  function handleClear() {
    setDescription('')
  }

  async function handleMarkAsComplete(item: any) {
    try {
      alert('todo')
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    axios.get(`${TODOLIST_API_BASE_URL}/api/todoItems`).then(({ data }) => {
      if (Array.isArray(data)) {
        setItems(data)
      }
    })
  }, [])

  const renderAddTodoItemContent = () => (
    <form noValidate onSubmit={handleAdd}>
      <div className="flex items-end">
        <FormInput label="Add todo item" name="todo-item" placeholder="Description..." wasSubmitted={wasSubmitted} />
        <button
          className="bg-teal-500 hover:bg-teal-600 text-teal-50 font-bold py-2 rounded mt-2 ml-2 px-8 h-10"
          type="submit"
        >
          Add
        </button>
      </div>
      {/* <Button variant="secondary" onClick={() => handleClear()}>
            Clear
          </Button> */}
    </form>
  )

  const renderTodoItemsContent = () => (
    <div>
      <h1>
        Showing {items.length} Item(s) <button onClick={() => getItems()}>Refresh</button>
      </h1>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                    <th scope="col" className="p-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {items.map((item: any) => (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={item.id}>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.id}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                        {item.description}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button
                          className="bg-teal-500 hover:bg-teal-600 text-teal-50 font-bold py-2 rounded mt-2 ml-2 px-8 h-10"
                          onClick={() => handleMarkAsComplete(item)}
                        >
                          Mark as completed
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
