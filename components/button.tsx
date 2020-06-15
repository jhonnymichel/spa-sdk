import classNames from 'classnames'

type Props = React.HTMLProps<HTMLButtonElement> & {
  variant?: 'lg' | 'md' | 'sm'
  type?: 'button' | 'submit' | 'reset'
}

function Button(props: Props): JSX.Element {
  const { children, type = 'button', variant = 'sm' } = props

  return (
    <button
      {...props}
      type={type}
      className={classNames(
        'py-2 px-4 rounded-lg bg-blue-300 border-b-4 border-blue-600',
        'hover:shadow-sm',
        {
          'text-base': variant === 'sm',
          'text-xl': variant === 'md',
          'text-2xl': variant === 'lg',
        }
      )}
    >
      {children}
    </button>
  )
}

export default Button
