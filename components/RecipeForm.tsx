'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ChefHat, Utensils, Clock, ThermometerSun, Users, Globe, Leaf, AlertTriangle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from '@radix-ui/react-dropdown-menu'

type FormData = {
  dishName: string
  ingredients: string[]
  cuisine: string[]
  dietaryRequirements: string[]
  servings: number | null
  difficulty: string
  spiceLevel: string
  timeRange: string
  otherNotes: string
  numberOfSuggestions: number
  adventurous: boolean
  ingredientsToAvoid: string[]
}

type RecipeFormProps = {
  onSubmit: (formData: FormData) => void
  isLoading: boolean
  initialData: Partial<FormData>
}

const difficultyOptions = ['Very Easy', 'Easy', 'Moderate', 'Challenging', 'Difficult']
const spiceLevelOptions = ['No spice', 'Mild', 'Medium', 'Hot', 'Extra Hot']
const timeRangeOptions = ['Quick (0-30 minutes)', 'Moderate (30-60 minutes)', 'Time-consuming (1-2 hours)', 'Lengthy (2-4 hours)', 'All day affair (4+ hours)']

export function RecipeForm({ onSubmit, isLoading, initialData }: RecipeFormProps) {
  const [formData, setFormData] = useState<FormData>({
    dishName: initialData.dishName || '',
    ingredients: initialData.ingredients || [],
    cuisine: initialData.cuisine || [],
    dietaryRequirements: initialData.dietaryRequirements || [],
    servings: initialData.servings || null,
    difficulty: initialData.difficulty || 'no_preference',
    spiceLevel: initialData.spiceLevel || 'no_preference',
    timeRange: initialData.timeRange || 'no_preference',
    otherNotes: initialData.otherNotes || '',
    numberOfSuggestions: initialData.numberOfSuggestions || 3,
    adventurous: initialData.adventurous || false,
    ingredientsToAvoid: initialData.ingredientsToAvoid || [],
  })

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTagAdd = (field: 'ingredients' | 'cuisine' | 'dietaryRequirements' | 'ingredientsToAvoid', value: string) => {
    if (value && !formData[field].includes(value)) {
      handleChange(field, [...formData[field], value])
    }
  }

  const handleTagRemove = (field: 'ingredients' | 'cuisine' | 'dietaryRequirements' | 'ingredientsToAvoid', tag: string) => {
    handleChange(field, formData[field].filter(t => t !== tag))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label htmlFor="dishName" className="text-left block font-bold text-lg">Dish Name <span className="text-sm text-muted-foreground font-normal"> - Specify a dish name or leave it blank for AI-generated suggestions.</span></Label>
        <Input
          id="dishName"
          placeholder="Enter a dish name or leave blank for suggestions"
          value={formData.dishName}
          onChange={(e) => handleChange('dishName', e.target.value)}
          disabled={isLoading}
          className="max-w-md"
        />

      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem value="ingredients">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2 font-bold text-lg">
              <ChefHat className="h-6 w-6" />
              Ingredients
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
            <Label htmlFor="ingredientsToAvoid" className="text-left block">Must Have Ingredients <span className="text-sm text-muted-foreground font-light"> - List the main ingredients for your recipe. E.g.: chicken, tomatoes, olive oil.</span></Label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add an ingredient"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleTagAdd('ingredients', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                  disabled={isLoading}
                  className="max-w-sm"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add an ingredient"]') as HTMLInputElement
                    if (input) {
                      handleTagAdd('ingredients', input.value)
                      input.value = ''
                    }
                  }}
                  disabled={isLoading}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.ingredients.map((ingredient) => (
                  <Badge key={ingredient} variant="secondary" className="text-sm">
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => handleTagRemove('ingredients', ingredient)}
                      className="ml-2 text-xs"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-4 mt-8">
                <Label htmlFor="ingredientsToAvoid" className="text-left block">Ingredients to Avoid<span className="text-sm text-muted-foreground font-light"> - Specify any ingredients you want to exclude from your recipes. E.g. pears, blue cheese, mushrooms.</span></Label>

                <div className="flex space-x-2">
                  <Input
                    id="ingredientsToAvoid"
                    placeholder="Add an ingredient to avoid"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleTagAdd('ingredientsToAvoid', (e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                    disabled={isLoading}
                    className="max-w-sm"
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('ingredientsToAvoid') as HTMLInputElement
                      if (input.value) {
                        handleTagAdd('ingredientsToAvoid', input.value)
                        input.value = ''
                      }
                    }}
                    disabled={isLoading}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.ingredientsToAvoid.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary" className="text-sm">
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => handleTagRemove('ingredientsToAvoid', ingredient)}
                        className="ml-2 text-xs"
                        disabled={isLoading}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

              </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cuisine">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Globe className="h-6 w-6" />
              Cuisine
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Specify the culinary style or region. Examples: Italian, Mexican, Thai, Mediterranean.</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a cuisine"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleTagAdd('cuisine', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                  disabled={isLoading}
                  className="max-w-sm"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a cuisine"]') as HTMLInputElement
                    if (input) {
                      handleTagAdd('cuisine', input.value)
                      input.value = ''
                    }
                  }}
                  disabled={isLoading}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.cuisine.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-sm">
                    {cuisine}
                    <button
                      type="button"
                      onClick={() => handleTagRemove('cuisine', cuisine)}
                      className="ml-2 text-xs"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dietaryRequirements">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Leaf className="h-6 w-6" />
              Dietary Requirements
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Add any dietary restrictions or preferences. Examples: vegetarian, gluten-free, low-carb, keto.</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a dietary requirement"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleTagAdd('dietaryRequirements', (e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ''
                    }
                  }}
                  disabled={isLoading}
                  className="max-w-sm"
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a dietary requirement"]') as HTMLInputElement
                    if (input) {
                      handleTagAdd('dietaryRequirements', input.value)
                      input.value = ''
                    }
                  }}
                  disabled={isLoading}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.dietaryRequirements.map((req) => (
                  <Badge key={req} variant="secondary" className="text-sm">
                    {req}
                    <button
                      type="button"
                      onClick={() => handleTagRemove('dietaryRequirements', req)}
                      className="ml-2 text-xs"
                      disabled={isLoading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Utensils className="h-6 w-6" />
              Recipe Details
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="servings" className="text-left block">Servings<span className="text-sm text-muted-foreground font-light"> - Adjust the number of servings for your recipe.</span></Label>

                <div className="flex items-center space-x-2">
                  <Slider
                    id="servings"
                    min={1}
                    max={12}
                    step={1}
                    value={formData.servings ? [formData.servings] : []}
                    onValueChange={(value) => handleChange('servings', value[0])}
                    disabled={isLoading}
                  />
                  <div className="w-12 text-center">{formData.servings || '-'}</div>
                </div>

              </div>

              <div className="space-y-4">
                <Label htmlFor="difficulty" className="text-left block">Difficulty<span className="text-sm text-muted-foreground font-light"> - Choose the cooking skill level required.</span></Label>

                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => handleChange('difficulty', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_preference">No preference</SelectItem>
                    {difficultyOptions.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase().replace(' ', '_')}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-4">
                <Label htmlFor="spiceLevel" className="text-left block">Spice Level<span className="text-sm text-muted-foreground font-light"> - Indicate your preferred level of spiciness.</span></Label>
                <Select
                  value={formData.spiceLevel}
                  onValueChange={(value) => handleChange('spiceLevel', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="spiceLevel">
                    <SelectValue placeholder="Select spice level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_preference">No preference</SelectItem>
                    {spiceLevelOptions.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase().replace(' ', '_')}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <div className="space-y-4">
                <Label htmlFor="timeRange" className="text-left block">Time Range<span className="text-sm text-muted-foreground font-light"> - Select the desired cooking time for your recipe.</span></Label>
                <Select
                  value={formData.timeRange}
                  onValueChange={(value) => handleChange('timeRange', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="timeRange">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_preference">No preference</SelectItem>
                    {timeRangeOptions.map((option) => (
                      <SelectItem key={option} value={option.toLowerCase().replace(/\s/g, '_').replace(/[()]/g, '')}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="additional">
          <AccordionTrigger className="text-left">
            <div className="flex items-center gap-2 font-bold text-lg">
              <ThermometerSun  className="h-6 w-6" />
              Additional Options
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">


              <div className="space-y-4">
                <Label htmlFor="numberOfSuggestions" className="text-left block">Number of Suggestions<span className="text-sm text-muted-foreground font-light"> - Choose how many recipe ideas you'd like to receive.</span></Label>

                <div className="flex items-center space-x-2">
                  <Slider
                    id="numberOfSuggestions"
                    min={1}
                    max={10}
                    step={1}
                    value={[formData.numberOfSuggestions]}
                    onValueChange={(value) => handleChange('numberOfSuggestions', value[0])}
                    disabled={isLoading}
                    className="max-w-xs"
                  />
                  <div className="w-12 text-center">{formData.numberOfSuggestions}</div>
                </div>

              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="adventurous"
                  checked={formData.adventurous}
                  onCheckedChange={(checked) => handleChange('adventurous', checked)}
                  disabled={isLoading}
                />
                <Label htmlFor="adventurous" className="text-left">Adventurous <span className="text-sm text-muted-foreground font-light">(more creative recipes)</span></Label>
              </div>
            </div>
            <div className="space-y-4 mt-6">
                <Label htmlFor="otherNotes" className="text-left block">Other Notes<span className="text-sm text-muted-foreground font-light"> - Add any extra details or preferences for your recipe.</span></Label>
                <Textarea
                  id="otherNotes"
                  placeholder="Any additional notes or preferences"
                  value={formData.otherNotes}
                  onChange={(e) => handleChange('otherNotes', e.target.value)}
                  disabled={isLoading}
                  className="max-w-md"
                />

              </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
<div className='items-center'>
      <Button type="submit" className="w-full max-w-md" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Ideas...
          </>
        ) : (
          'Generate Recipe Ideas'
        )}
      </Button>
      </div>
    </form>
  )
}