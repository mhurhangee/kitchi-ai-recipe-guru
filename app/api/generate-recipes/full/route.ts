import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { fullRecipeSchema } from '../schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const { id, title, description, servings, timeDescription, cuisine, difficulty, spiceLevel } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: fullRecipeSchema,
    prompt: `Generate a full recipe based on the following idea:
      ID: ${id}
      Title: ${title}
      Description: ${description}
      Servings: ${servings}
      Time Description: ${timeDescription}
      Cuisine: ${cuisine}
      Difficulty: ${difficulty}
      Spice Level: ${spiceLevel}
      
      Provide a brief description, a list of ingredients, step-by-step instructions, and maintain the given servings, time description, cuisine, difficulty, and spice level.`,
  })

  return result.toTextStreamResponse()
}