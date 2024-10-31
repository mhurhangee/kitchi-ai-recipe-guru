'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RecipeForm } from './RecipeForm'
import { RecipeIdeas } from './RecipeIdeas'
import { FullRecipe } from './FullRecipe'
import { RecipeStepper } from './RecipeStepper'

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

export function RecipeGeneratorLayout() {
  const [activePanel, setActivePanel] = useState('form')
  const [recipeIdeas, setRecipeIdeas] = useState<RecipeIdea[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipeType | null>(null)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const handleFormSubmit = (ideas: RecipeIdea[]) => {
    setRecipeIdeas(ideas)
    setActivePanel('ideas')
    setCompletedSteps(['form'])
  }

  const handleSelectRecipe = (recipe: FullRecipeType) => {
    setSelectedRecipe(recipe)
    setActivePanel('recipe')
    setCompletedSteps(['form', 'ideas'])
  }

  const handleStepClick = (step: string) => {
    if (completedSteps.includes(step) || step === activePanel) {
      setActivePanel(step)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RecipeStepper 
        currentStep={activePanel} 
        onStepClick={handleStepClick} 
        completedSteps={completedSteps}
      />
      <AnimatePresence mode="wait">
        {activePanel === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <RecipeForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}
        {activePanel === 'ideas' && (
          <motion.div
            key="ideas"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <RecipeIdeas
              ideas={recipeIdeas}
              onSelectRecipe={handleSelectRecipe}
              onBack={() => setActivePanel('form')}
            />
          </motion.div>
        )}
        {activePanel === 'recipe' && (
          <motion.div
            key="recipe"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <FullRecipe
              recipe={selectedRecipe}
              onBack={() => setActivePanel('ideas')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}