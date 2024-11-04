// see - https://sdk.vercel.ai/docs/foundations/providers-and-models 
// for list of models and providers that work with useObject and streamObject

import { openai } from '@ai-sdk/openai'

export const MODEL = openai('gpt-4o-mini')

export const TEMPERATURE = 0.7
export const MAX_TOKENS = 1024