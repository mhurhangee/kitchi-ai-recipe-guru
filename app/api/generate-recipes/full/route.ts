import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { fullRecipeSchema } from '../schema'

export const maxDuration = 30

export async function POST(req: Request) {
  const { id, title, description } = await req.json()

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: fullRecipeSchema,
    prompt: `Generate a full recipe based on the following idea:
      ID: ${id}
      Title: ${title}
      Description: ${description}
      
      Provide a list of ingredients, step-by-step instructions, number of servings, preparation time, and cooking time.`,
  })

  return result.toTextStreamResponse()
}