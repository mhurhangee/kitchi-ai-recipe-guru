import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type FullRecipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

type FullRecipeProps = {
  recipe: FullRecipe | null
}

export function FullRecipe({ recipe }: FullRecipeProps) {
  if (!recipe) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}