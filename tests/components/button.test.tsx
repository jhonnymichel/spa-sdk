import Button from 'components/button'
import { render, fireEvent, screen } from 'tests/utils'

describe('Button', () => {
  it('Renders button with correct text', () => {
    render(<Button>Hello, World!</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Hello, World!')
  })

  it('Executes onClick callback when clicked', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(3)
  })
})
