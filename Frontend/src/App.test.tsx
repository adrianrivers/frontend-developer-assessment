import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders the footer text', () => {
  const { container } = render(<App />)

  // const footerElement = screen.getByText(/clearpoint.digital/i)
  // expect(footerElement).toBeInTheDocument()

  expect(container).toMatchSnapshot()
})
