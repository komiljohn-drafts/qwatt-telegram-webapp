import React from 'react'
import { render } from '@testing-library/react'
import Footer from './index'

describe('About component', () => {
  it('should render Footer component', () => {
    const { asFragment } = render(<Footer />)
    expect(asFragment(<Footer />)).toMatchSnapshot()
  })
})
