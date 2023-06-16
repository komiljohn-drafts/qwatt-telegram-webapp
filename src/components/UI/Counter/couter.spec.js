import React from 'react'
import { render } from '@testing-library/react'
import { Counter } from './index'
import { mockStore } from '@/test-config/mockReduxStore'
import MockReduxProvider from '@/test-config/MockReduxProvider'

describe('Counter component', () => {
  it('should render Counter component with values', () => {
    const { asFragment } = render(
      <MockReduxProvider customStore={mockStore}>
        <Counter />
      </MockReduxProvider>
    )
    expect(
      asFragment(
        <MockReduxProvider customStore={mockStore}>
          <Counter />
        </MockReduxProvider>
      )
    ).toMatchSnapshot()
  })

  it('should render Counter component with empty values', () => {
    const { asFragment } = render(
      <MockReduxProvider>
        <Counter />
      </MockReduxProvider>
    )
    expect(
      asFragment(
        <MockReduxProvider>
          <Counter />
        </MockReduxProvider>
      )
    ).toMatchSnapshot()
  })
})
