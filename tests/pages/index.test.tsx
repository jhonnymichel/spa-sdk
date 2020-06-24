import IndexPage from 'pages/index'
import { render, screen, waitForElementToBeRemoved } from 'tests/utils'
import { fireEvent } from '@testing-library/react'

describe('Index page', () => {
  it('Displays a click counter with controllers', async () => {
    render(<IndexPage />)
    expect(screen.getByText('0')).toBeTruthy()
    const lowerButton = screen.getByText('-', { selector: 'button' })
    const raiseButton = screen.getByText('+', { selector: 'button' })

    expect(lowerButton).toBeTruthy()
    expect(raiseButton).toBeTruthy()
  })

  it('Updates the click counter when the user click the buttons', async () => {
    render(<IndexPage />)
    expect(screen.getByText('0')).toBeTruthy()
    const lowerButton = screen.getByText('-', { selector: 'button' })
    const raiseButton = screen.getByText('+', { selector: 'button' })

    fireEvent.click(raiseButton)
    fireEvent.click(raiseButton)
    fireEvent.click(raiseButton)

    expect(screen.getByText('3')).toBeTruthy()

    fireEvent.click(lowerButton)
    fireEvent.click(lowerButton)

    expect(screen.getByText('1')).toBeTruthy()
  })
})
