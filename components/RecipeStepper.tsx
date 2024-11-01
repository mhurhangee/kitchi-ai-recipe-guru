import React from 'react'
import { Check, ChefHat, List, UtensilsCrossed, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = {
  id: string
  label: string
  icon: React.ReactNode
}

type RecipeStepperProps = {
  currentStep: string
  onStepClick: (step: string) => void
  completedSteps: string[]
  onStartAgain: () => void
}

const mainSteps: Step[] = [
  { id: 'input', label: 'Options', icon: <List className="h-4 w-4" /> },
  { id: 'ideas', label: 'Ideas', icon: <ChefHat className="h-4 w-4" /> },
  { id: 'recipe', label: 'Recipe', icon: <UtensilsCrossed className="h-4 w-4" /> },
]

export function RecipeStepper({ currentStep, onStepClick, completedSteps, onStartAgain }: RecipeStepperProps) {
  return (
    <div className="flex items-center justify-center mb-8 px-4 sm:px-0">
      <div className="flex items-center w-full max-w-2xl">
        <button
          onClick={onStartAgain}
          className="flex flex-col items-center text-sm font-medium text-primary hover:text-primary/80 mr-8 sm:mr-12"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background">
            <RotateCcw className="h-4 w-4" />
          </span>
          <span className="mt-2 text-xs">Start Over</span>
        </button>

        <nav aria-label="Progress" className="flex-grow">
          <ol className="flex items-center justify-between w-full">
            {mainSteps.map((step, stepIdx) => (
              <li key={step.id} className="relative flex flex-col items-center flex-1">
                {stepIdx !== 0 && (
                  <div className="absolute top-5 left-0 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-1.25rem)] h-0.5" aria-hidden="true">
                    <div className="h-0.5 w-full bg-muted">
                      <div 
                        className="h-full bg-primary transition-all duration-300 ease-in-out" 
                        style={{ 
                          width: completedSteps.includes(mainSteps[stepIdx - 1].id) ? '100%' : 
                                 currentStep === mainSteps[stepIdx - 1].id ? '50%' : '0%' 
                        }}
                      />
                    </div>
                  </div>
                )}
                <button
                  className={cn(
                    "group flex flex-col items-center text-sm font-medium",
                    completedSteps.includes(step.id) ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => onStepClick(step.id)}
                  disabled={!completedSteps.includes(step.id) && step.id !== currentStep}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background relative z-10">
                    {completedSteps.includes(step.id) ? (
                      <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                    ) : currentStep === step.id ? (
                      step.icon
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                    )}
                  </span>
                  <span className="mt-2 text-xs whitespace-nowrap">{step.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}