import { z } from 'zod';

export const recipeIdeasSchema = z.object({
  recipeIdeas: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })
  ),
});

export const fullRecipeSchema = z.object({
  id: z.string(),
  title: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  servings: z.number(),
  prepTime: z.string(),
  cookTime: z.string(),
});