'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type RecipeIdea = {
  id: string
  title: string
  description: string
}

type RecipeFormProps = {
  onSubmit: (ideas: RecipeIdea[]) => void
}

export function RecipeForm({ onSubmit }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: Generate mock recipe ideas
    const mockIdeas: RecipeIdea[] = [
      { id: '1', title: 'Spicy Vegetable Curry', description: 'A flavorful curry with mixed vegetables' },
      { id: '2', title: 'Grilled Chicken Salad', description: 'A light and healthy salad with grilled chicken' },
      { id: '3', title: 'Mushroom Risotto', description: 'A creamy Italian rice dish with mushrooms' },
    ]
    onSubmit(mockIdeas)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="ingredients">Ingredients</Label>
        <Textarea
          id="ingredients"
          placeholder="Enter ingredients, separated by commas"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="cuisine">Cuisine (optional)</Label>
        <Input
          id="cuisine"
          placeholder="e.g., Italian, Mexican, Chinese"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="dietary-requirements">Dietary Requirements (optional)</Label>
        <Input
          id="dietary-requirements"
          placeholder="e.g., vegetarian, gluten-free, low-carb"
          value={dietaryRequirements}
          onChange={(e) => setDietaryRequirements(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button type="submit" className="w-full">Generate Recipe Ideas</Button>
    </form>
  )
}