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

const steps: Step[] = [
  { id: 'start', label: 'Start Over', icon: <RotateCcw className="h-4 w-4" /> },
  { id: 'input', label: 'Input', icon: <List className="h-4 w-4" /> },
  { id: 'ideas', label: 'Ideas', icon: <ChefHat className="h-4 w-4" /> },
  { id: 'recipe', label: 'Recipe', icon: <UtensilsCrossed className="h-4 w-4" /> },
]

export function RecipeStepper({ currentStep, onStepClick, completedSteps, onStartAgain }: RecipeStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center space-x-8 max-w-4xl mx-auto">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="relative">
            {stepIdx !== 0 && (
              <div className="absolute left-0 top-5 -translate-y-1/2 -ml-[calc(100%+2rem)] w-[calc(100%+2rem)] h-0.5" aria-hidden="true">
                <div className="h-0.5 w-full bg-muted">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-in-out" 
                    style={{ 
                      width: stepIdx === 1 ? '25%' : 
                             completedSteps.includes(steps[stepIdx - 1].id) ? '100%' : 
                             currentStep === steps[stepIdx - 1].id ? '50%' : '0%' 
                    }}
                  />
                </div>
              </div>
            )}
            <button
              className={cn(
                "group flex flex-col items-center text-sm font-medium",
                step.id === 'start' ? "text-primary hover:text-primary/80" : 
                completedSteps.includes(step.id) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => step.id === 'start' ? onStartAgain() : onStepClick(step.id)}
              disabled={step.id !== 'start' && !completedSteps.includes(step.id) && step.id !== currentStep}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background relative z-10">
                {step.id === 'start' ? (
                  step.icon
                ) : completedSteps.includes(step.id) ? (
                  <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                ) : currentStep === step.id ? (
                  step.icon
                ) : (
                  <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                )}
              </span>
              <span className="mt-2 text-xs">{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}