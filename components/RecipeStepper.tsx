import { Check, ChefHat, List, UtensilsCrossed } from 'lucide-react'
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
}

const steps: Step[] = [
  { id: 'form', label: 'Ingredients', icon: <List className="h-4 w-4" /> },
  { id: 'ideas', label: 'Ideas', icon: <ChefHat className="h-4 w-4" /> },
  { id: 'recipe', label: 'Recipe', icon: <UtensilsCrossed className="h-4 w-4" /> },
]

export function RecipeStepper({ currentStep, onStepClick, completedSteps }: RecipeStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center justify-between max-w-sm mx-auto">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className={cn("relative", stepIdx !== steps.length - 1 && "flex-1")}>
            {stepIdx !== steps.length - 1 && (
              <div className="absolute top-2 left-4 w-full" aria-hidden="true">
                <div className="h-0.5 w-full bg-muted">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-in-out" 
                    style={{ width: completedSteps.includes(step.id) ? '100%' : '0%' }}
                  />
                </div>
              </div>
            )}
            <button
              className={cn(
                "relative flex flex-col items-center text-sm font-medium",
                completedSteps.includes(step.id) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => onStepClick(step.id)}
              disabled={!completedSteps.includes(step.id) && step.id !== currentStep}
            >
              <span className="absolute -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background">
                {completedSteps.includes(step.id) ? (
                  <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                ) : (
                  currentStep === step.id ? (
                    step.icon
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-muted" />
                  )
                )}
              </span>
              <span className="mt-8 text-xs">{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}