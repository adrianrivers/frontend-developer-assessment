import { render } from '@testing-library/react'
import React from 'react'
import Header from '../Header'

describe('Header', () => {
  it('should render a Header component', () => {
    const { container } = render(<Header />)
    const img = container.querySelector('img') as HTMLImageElement
    const link = img.parentElement as HTMLAnchorElement

    expect(img.src).toContain('/clearPointLogo.png')
    expect(link.href).toBe('https://clearpoint.digital/')
    expect(container).toMatchSnapshot()
  })
})
