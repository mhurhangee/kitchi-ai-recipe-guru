'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RecipeForm } from './RecipeForm'
import { RecipeIdeas } from './RecipeIdeas'
import { FullRecipe } from './FullRecipe'
import { RecipeStepper } from './RecipeStepper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type RecipeIdea = {
  id: string
  title: string
  description: string
}

type FullRecipeType = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

const stages = ['input', 'ideas', 'recipe']

export function RecipeGeneratorLayout() {
  const [activePanel, setActivePanel] = useState('input')
  const [recipeIdeas, setRecipeIdeas] = useState<RecipeIdea[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipeType | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [direction, setDirection] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.scrollHeight)
    }
  }, [activePanel])

  const handleFormSubmit = (ideas: RecipeIdea[]) => {
    setRecipeIdeas(ideas)
    setActivePanel('ideas')
    setCompletedSteps(['input'])
    setDirection(1)
  }

  const handleSelectRecipe = (recipe: FullRecipeType) => {
    setSelectedRecipe(recipe)
    setActivePanel('recipe')
    setCompletedSteps(['input', 'ideas'])
    setDirection(1)
  }

  const handleStepClick = (step: string) => {
    if (completedSteps.includes(step) || step === activePanel) {
      setDirection(stages.indexOf(step) > stages.indexOf(activePanel) ? 1 : -1)
      setActivePanel(step)
    }
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = stages.indexOf(activePanel)
    if (direction === 'prev' && currentIndex > 0) {
      setDirection(-1)
      setActivePanel(stages[currentIndex - 1])
    } else if (direction === 'next' && currentIndex < stages.length - 1 && completedSteps.includes(stages[currentIndex])) {
      setDirection(1)
      setActivePanel(stages[currentIndex + 1])
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const transition = {
    x: { type: "spring", stiffness: 100, damping: 20 },
    opacity: { duration: 0.3 }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RecipeStepper 
        currentStep={activePanel} 
        onStepClick={handleStepClick} 
        completedSteps={completedSteps}
      />
      <div 
        className="relative overflow-hidden" 
        style={{ height: containerHeight }}
        ref={containerRef}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {activePanel === 'input' && (
            <motion.div
              key="input"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recipe Input</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('prev')}
                      disabled={true}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('next')}
                      disabled={!completedSteps.includes('input')}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecipeForm onSubmit={handleFormSubmit} />
                </CardContent>
              </Card>
            </motion.div>
          )}
          {activePanel === 'ideas' && (
            <motion.div
              key="ideas"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recipe Ideas</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('next')}
                      disabled={!completedSteps.includes('ideas')}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecipeIdeas
                    ideas={recipeIdeas}
                    onSelectRecipe={handleSelectRecipe}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}
          {activePanel === 'recipe' && (
            <motion.div
              key="recipe"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="absolute w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Full Recipe</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleNavigation('next')}
                      disabled={true}
                    >
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <FullRecipe recipe={selectedRecipe} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}