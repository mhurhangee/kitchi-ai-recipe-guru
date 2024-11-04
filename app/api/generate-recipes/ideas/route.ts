
import { streamObject } from 'ai'
import { recipeIdeasSchema } from '../schema'
import { MODEL, TEMPERATURE, MAX_TOKENS } from '@/lib/model'

export const maxDuration = 30

export async function POST(req: Request) {
  const { formData, similarTo } = await req.json()

  console.log(formData)

  let prompt = ''
  const numberOfSuggestions = formData?.numberOfSuggestions || 4

  // Function to check if the form has any meaningful input
  const hasFormInput = (data: any) => {
    if (!data) return false
    const relevantFields = ['recipeNames', 'ingredients', 'cuisine', 'dietaryRequirements', 'difficulty', 'spiceLevel', 'timeRange', 'recipeType', 'otherNotes', 'ingredientsToAvoid']
    return relevantFields.some(field => {
      if (Array.isArray(data[field])) {
        return data[field].length > 0
      }
      return data[field] !== null && data[field] !== undefined && data[field] !== ''
    })
  }

  if (similarTo) {
    prompt = `Generate ${numberOfSuggestions} recipe ideas similar to the following recipe:
    Title: ${similarTo.title}
    Description: ${similarTo.description}
    Cuisine: ${similarTo.cuisine}
    Difficulty: ${similarTo.difficulty}
    Spice Level: ${similarTo.spiceLevel}

    Please provide recipes that are inspired by this one but with variations in ingredients, cooking methods, or flavor profiles.`
  } else if (!hasFormInput(formData)) {
    prompt = `Generate ${numberOfSuggestions} random and inspirational recipe ideas. Be creative and diverse in your suggestions.`
  } else {
    prompt = `Generate ${numberOfSuggestions} recipe ideas based on the following criteria:\n`

    if (formData.recipeNames && formData.recipeNames.length > 0) {
      prompt += ` - Recipe Names: ${formData.recipeNames.join(', ')}\n`
      if (formData.recipeNameSearchType) {
        prompt += ` - Suggestions should be ${formData.recipeNameSearchType} of the named recipe(s).\n`
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
  }

  prompt += `\nFor each recipe idea, provide:
  - Title
  - Brief description
  - Number of servings
  - Time description (e.g. Quick, Average, or Slow)
  - Cuisine (e.g. Italian, Dessert, American)
  - Difficulty level (e.g. Easy, Medium, Hard)
  - Spice level (e.g. Mild, Medium, Hot)`

  console.log(prompt)

  const result = await streamObject({
    model: MODEL,
    schema: recipeIdeasSchema,
    prompt: prompt,
    temperature: TEMPERATURE,
    maxTokens: MAX_TOKENS,
  })

  return result.toTextStreamResponse()
}