import { useEffect } from 'react'

function useFocusFirstInput(valueToTriggerFocus: any, delay: number): void {
  useEffect(() => {
    setTimeout(() => {
      const input = document.querySelector(`input`)
      if (input) {
        input.focus()
      }
    }, delay)
  }, [valueToTriggerFocus])
}

export default useFocusFirstInput
