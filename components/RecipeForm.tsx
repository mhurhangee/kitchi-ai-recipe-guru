'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function RecipeForm() {
  const [ingredients, setIngredients] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dietaryRequirements, setDietaryRequirements] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // We'll implement the AI generation logic here later
    console.log({ ingredients, cuisine, dietaryRequirements })
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