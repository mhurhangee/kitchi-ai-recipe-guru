import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, Users, ThermometerSun, BarChart, Globe } from 'lucide-react'

type FullRecipe = {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  servings: number
  timeDescription: string
  cuisine: string
  difficulty: string
  spiceLevel: string
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
          <Skeleton className="h-4 w-full mb-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-12 w-full mb-4" />
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

  if (!recipe) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">{recipe.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{recipe.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap justify-between p-2 sm:p-4 bg-muted rounded-md text-xs sm:text-sm">
          <div className="flex items-center space-x-2 mb-1 sm:mb-0">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center space-x-2 mb-1 sm:mb-0">
            <Clock className="h-4 w-4" />
            <span>{recipe.timeDescription}</span>
          </div>
          <div className="flex items-center space-x-2 mb-1 sm:mb-0">
            <BarChart className="h-4 w-4" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex items-center space-x-2 mb-1 sm:mb-0">
            <ThermometerSun className="h-4 w-4" />
            <span>{recipe.spiceLevel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>{recipe.cuisine}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Ingredients:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-primary">Instructions:</h3>
          <ol className="space-y-2 text-sm">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex">
                <span className="font-medium mr-2">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}