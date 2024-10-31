'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

type FormData = {
  ingredients: string
  cuisine: string
  dietaryRequirements: string
}

type RecipeFormProps = {
  onSubmit: (formData: FormData) => void
  isLoading: boolean
  initialData: FormData
}

export function RecipeForm({ onSubmit, isLoading, initialData }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState(initialData.ingredients)
  const [cuisine, setCuisine] = useState(initialData.cuisine)
  const [dietaryRequirements, setDietaryRequirements] = useState(initialData.dietaryRequirements)

  useEffect(() => {
    setIngredients(initialData.ingredients)
    setCuisine(initialData.cuisine)
    setDietaryRequirements(initialData.dietaryRequirements)
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ingredients, cuisine, dietaryRequirements })
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          'Generate Recipe Ideas'
        )}
      </Button>
    </form>
  )
}