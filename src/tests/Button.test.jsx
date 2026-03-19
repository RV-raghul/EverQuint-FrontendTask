import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../components/ui/Button'

describe('Button', () => {
  test('renders button with correct text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  test('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    await userEvent.click(screen.getByText('Click Me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick} disabled>Click Me</Button>)
    await userEvent.click(screen.getByText('Click Me'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})