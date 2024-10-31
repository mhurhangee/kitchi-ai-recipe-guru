import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { recipeIdeasSchema } from '../schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const formData = await req.json()

  let prompt = `Generate ${formData.numberOfSuggestions || 3} recipe ideas based on the following criteria:\n`

  if (formData.dishName) {
    prompt += `Dish Name: ${formData.dishName}\n`
  }

  if (formData.ingredients && formData.ingredients.length > 0) {
    prompt += `Ingredients: ${formData.ingredients.join(', ')}\n`
  }

  if (formData.cuisine) {
    prompt += `Cuisine: ${formData.cuisine}\n`
  }

  if (formData.dietaryRequirements && formData.dietaryRequirements.length > 0) {
    prompt += `Dietary Requirements: ${formData.dietaryRequirements.join(', ')}\n`
  }

  if (formData.servings) {
    prompt += `Servings: ${formData.servings}\n`
  }

  if (formData.difficulty) {
    prompt += `Difficulty: ${formData.difficulty}\n`
  }

  if (formData.spiceLevel) {
    prompt += `Spice Level: ${formData.spiceLevel}\n`
  }

  if (formData.timeRange) {
    prompt += `Time Range: ${formData.timeRange}\n`
  }

  if (formData.otherNotes) {
    prompt += `Additional Notes: ${formData.otherNotes}\n`
  }

  if (formData.adventurous) {
    prompt += `Please provide more creative and adventurous recipe ideas.\n`
  }

  if (formData.ingredientsToAvoid && formData.ingredientsToAvoid.length > 0) {
    prompt += `Ingredients to Avoid: ${formData.ingredientsToAvoid.join(', ')}\n`
  }

  prompt += `\nProvide a title and brief description for each recipe idea.`

  console.log(prompt)

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: recipeIdeasSchema,
    prompt: prompt,
  })

  return result.toTextStreamResponse()
}