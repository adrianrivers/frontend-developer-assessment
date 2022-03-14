import { render } from '@testing-library/react'
import React from 'react'
import Footer from '../Footer'

describe('Footer', () => {
  it('should render a Footer component', () => {
    const { container, getByText } = render(<Footer />)
    const link = getByText('clearpoint.digital').closest('a') as HTMLAnchorElement

    expect(link.href).toBe('https://clearpoint.digital/')
    expect(link.innerHTML).toBe('clearpoint.digital')
    expect(container).toMatchSnapshot()
  })
})
