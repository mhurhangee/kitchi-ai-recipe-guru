import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { recipeIdeasSchema } from '../schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const { ingredients, cuisine, dietaryRequirements } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: recipeIdeasSchema,
    prompt: `Generate 3 recipe ideas based on the following:
      Ingredients: ${ingredients || 'Any'}
      Cuisine: ${cuisine || 'Any'}
      Dietary Requirements: ${dietaryRequirements || 'None'}
      
      Provide a title and brief description for each recipe idea.`,
  })

  return result.toTextStreamResponse()
}