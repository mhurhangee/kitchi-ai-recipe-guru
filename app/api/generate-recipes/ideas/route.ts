import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { recipeIdeasSchema } from '../schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const formData = await req.json()

  let prompt = ''
  const numberOfSuggestions = formData.numberOfSuggestions || 4

  // Function to check if the form has any meaningful input
  const hasFormInput = (data: any) => {
    const relevantFields = ['recipeNames', 'ingredients', 'cuisine', 'dietaryRequirements', 'difficulty', 'spiceLevel', 'timeRange', 'recipeType', 'otherNotes', 'ingredientsToAvoid']
    return relevantFields.some(field => {
      if (Array.isArray(data[field])) {
        return data[field].length > 0
      }
      return data[field] !== null && data[field] !== undefined && data[field] !== ''
    })
  }

  if (!hasFormInput(formData)) {
    prompt = `Generate ${numberOfSuggestions} random and inspirational recipe ideas. Be creative and diverse in your suggestions. Provide a title and brief description for each recipe idea.`
  } else {
    prompt = `Generate ${numberOfSuggestions} recipe ideas based on the following criteria:\n`

    if (formData.recipeNames && formData.recipeNames.length > 0) {
      prompt += ` - Recipe Names: ${formData.recipeNames.join(', ')}\n`
      if (formData.recipeNameSearchType) {
        prompt += ` - Suggestions should be  ${formData.recipeNameSearchType} of the named recipe(s).\n`
      }
    }

    if (formData.ingredients && formData.ingredients.length > 0) {
      prompt += ` - Ingredients: ${formData.ingredients.join(', ')}\n`
    }

    if (formData.cuisine && formData.cuisine.length > 0) {
      prompt += ` - Cuisine: ${formData.cuisine.join(', ')}\n`
    }

    if (formData.dietaryRequirements && formData.dietaryRequirements.length > 0) {
      prompt += ` - Dietary Requirements: ${formData.dietaryRequirements.join(', ')}\n`
    }

    if (formData.servings) {
      prompt += ` - Servings: ${formData.servings}\n`
    }

    if (formData.difficulty) {
      prompt += ` - Difficulty: ${formData.difficulty}\n`
    }

    if (formData.spiceLevel) {
      prompt += ` - Spice Level: ${formData.spiceLevel}\n`
    }

    if (formData.timeRange) {
      prompt += ` - Time Range: ${formData.timeRange}\n`
    }

    if (formData.recipeType) {
      prompt += ` - Recipe Type: ${formData.recipeType}\n`
    }

    if (formData.otherNotes) {
      prompt += ` - Additional Notes: ${formData.otherNotes}\n`
    }

    if (formData.adventurous) {
      prompt += ` - Please provide more creative and adventurous recipe ideas.\n`
    }

    if (formData.ingredientsToAvoid && formData.ingredientsToAvoid.length > 0) {
      prompt += ` - Ingredients to Avoid: ${formData.ingredientsToAvoid.join(', ')}\n`
    }

    prompt += `\nProvide a title and brief description for each recipe idea.`
  }

  console.log(prompt)

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: recipeIdeasSchema,
    prompt: prompt,
  })

  return result.toTextStreamResponse()
}