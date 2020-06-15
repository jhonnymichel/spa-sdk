// test-utils.js
import React from 'react'
import { render } from '@testing-library/react'
import { initializeStore } from 'store'
import { Provider } from 'mobx-react'
import 'mobx-react/batchingForReactDom'

const AllTheProviders = ({ children }) => {
  const store = initializeStore()

  return <Provider store={store}>{children}</Provider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
