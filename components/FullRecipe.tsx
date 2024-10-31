import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type FullRecipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
  servings: number
  prepTime: string
  cookTime: string
}

type FullRecipeProps = {
  recipe: FullRecipe | null
  isLoading: boolean
}

export function FullRecipe({ recipe, isLoading }: FullRecipeProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div>
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!recipe) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{recipe.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-left">
      <div className="flex flex-wrap justify-between text-sm text-muted-foreground bg-muted p-4 rounded-md">
          <span className="text-left">Servings: {recipe.servings}</span>
          <span className="text-left">Prep Time: {recipe.prepTime}</span>
          <span className="text-left">Cook Time: {recipe.cookTime}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary text-left">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-left">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-foreground">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary text-left">Instructions:</h3>
          <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-left">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-foreground">{step}</li>
            ))}
          </ol>
        </div>

      </CardContent>
    </Card>
  )
}