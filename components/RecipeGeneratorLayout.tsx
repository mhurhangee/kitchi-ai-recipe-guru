"use client"

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experimental_useObject as useObject } from 'ai/react'
import { RecipeForm } from './RecipeForm'
import { RecipeIdeas } from './RecipeIdeas'
import { FullRecipe } from './FullRecipe'
import { RecipeStepper } from './RecipeStepper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { recipeIdeasSchema, fullRecipeSchema } from '@/app/api/generate-recipes/schema'

const stages = ['input', 'ideas', 'recipe']

export type RecipeIdea = {
  id: string
  title: string
  description: string
  servings: number
  prepTime: string
  cookTime: string
  cuisine: string
  difficulty: string
  spiceLevel: string
}

type FullRecipeType = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  servings: number
  prepTime: string
  cookTime: string
}

type FormData = {
  recipeNames: string[]
  recipeNameSearchType: 'similar' | 'exact' | 'variants' | null
  ingredients: string[]
  cuisine: string[]
  dietaryRequirements: string[]
  servings: number
  difficulty: string | null
  spiceLevel: string | null
  timeRange: string | null
  recipeType: string | null
  otherNotes: string
  numberOfSuggestions: number
  adventurous: boolean
  ingredientsToAvoid: string[]
}

export function RecipeGeneratorLayout() {
  const [activePanel, setActivePanel] = useState('input')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [direction, setDirection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    recipeNames: [],
    recipeNameSearchType: null,
    ingredients: [],
    cuisine: [],
    dietaryRequirements: [],
    servings: 2,
    difficulty: null,
    spiceLevel: null,
    timeRange: null,
    recipeType: null,
    otherNotes: '',
    numberOfSuggestions: 4,
    adventurous: false,
    ingredientsToAvoid: [],
  })
  const containerRef = useRef<HTMLDivElement>(null)

  const { 
    object: recipeIdeas, 
    submit: generateRecipeIdeas,
    isLoading: isGeneratingIdeas
  } = useObject({
    api: '/api/generate-recipes/ideas',
    schema: recipeIdeasSchema,
  })

  const {
    object: fullRecipe,
    submit: generateFullRecipe,
    isLoading: isGeneratingRecipe
  } = useObject({
    api: '/api/generate-recipes/full',
    schema: fullRecipeSchema,
  })

  const handleFormSubmit = (data: FormData) => {
    setFormData(data)
    generateRecipeIdeas({ formData: data }) 
    setActivePanel('ideas')
    setCompletedSteps(['input'])
    setDirection(1)
  }

  const handleSelectRecipe = (recipeId: string) => {
    const selectedIdea = recipeIdeas?.recipeIdeas?.find(idea => idea?.id === recipeId)
    if (selectedIdea) {
      generateFullRecipe({ id: recipeId, ...selectedIdea })
      setActivePanel('recipe')
      setCompletedSteps(['input', 'ideas'])
      setDirection(1)
    }
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

  const handleGenerateSimilar = (recipeId: string) => {
    const selectedIdea = recipeIdeas?.recipeIdeas?.find(idea => idea?.id === recipeId)
    if (selectedIdea) {
      generateRecipeIdeas({ formData, similarTo: selectedIdea })
      setActivePanel('ideas')
      setCompletedSteps(['input', 'ideas'])
      setDirection(0)
    }
  }

  const handleStartAgain = () => {
    setActivePanel('input')
    setCompletedSteps([])
    setDirection(0)
    setFormData({
      recipeNames: [],
      recipeNameSearchType: null,
      ingredients: [],
      cuisine: [],
      dietaryRequirements: [],
      servings: 2,
      difficulty: null,
      spiceLevel: null,
      timeRange: null,
      recipeType: null,
      otherNotes: '',
      numberOfSuggestions: 4,
      adventurous: false,
      ingredientsToAvoid: [],
    })
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
        onStartAgain={handleStartAgain}
      />
      <div 
        className="relative"
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
              className="w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle><span className="text-2xl font-bold mb-8 text-center font-serif">Recipe Options</span></CardTitle>
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
                  <RecipeForm onSubmit={handleFormSubmit} isLoading={isGeneratingIdeas} initialData={formData} />
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
              className="w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle><span className="text-2xl font-bold mb-8 text-center font-serif">Recipe Ideas</span></CardTitle>
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
                    ideas={(recipeIdeas?.recipeIdeas || []) as RecipeIdea[]}
                    onSelectRecipe={handleSelectRecipe}
                    onGenerateSimilar={handleGenerateSimilar}
                    isLoading={isGeneratingIdeas}
                    numberOfSuggestions={formData.numberOfSuggestions}
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
              className="w-full"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle><span className="text-2xl font-bold mb-8 text-center font-serif">Full Recipe</span></CardTitle>
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
                  <FullRecipe recipe={fullRecipe as FullRecipeType | null} isLoading={isGeneratingRecipe} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}