import { useState, useRef } from 'react'
import classNames from 'classnames'

type UpdateStep = (nextStep: number) => void

function useStepTransition(step: number): [number, string, UpdateStep] {
  const lastStep = useRef<number | null>()
  const [currentStep, setCurrentStep] = useState(step)
  const [animationClassNames, setAnimationClassNames] = useState(classNames('transition-next'))

  const updateStep: UpdateStep = (nextStep) => {
    lastStep.current = currentStep
    setAnimationClassNames(
      classNames({
        'transition-next': nextStep > currentStep,
        'transition-prev': nextStep < currentStep,
      })
    )

    requestAnimationFrame(() => {
      setCurrentStep(nextStep)
    })
  }

  return [currentStep, animationClassNames, updateStep]
}

export default useStepTransition
