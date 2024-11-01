import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, Users, ThermometerSun, BarChart, Repeat, ChefHat, Globe } from 'lucide-react'
import { RecipeIdea } from './RecipeGeneratorLayout'

type RecipeIdeasProps = {
  ideas: RecipeIdea[]
  onSelectRecipe: (recipeId: string) => void
  onGenerateSimilar: (recipeId: string) => void
  isLoading: boolean
  numberOfSuggestions: number
}

export function RecipeIdeas({ ideas, onSelectRecipe, onGenerateSimilar, isLoading, numberOfSuggestions }: RecipeIdeasProps) {
  const ideasToRender = isLoading ? Array(numberOfSuggestions).fill(null) : ideas

  return (
    <div className="space-y-4" key="recipe-ideas-list">
      {ideasToRender.map((idea, index) => (
        <Card key={idea ? idea.id : `loading-${index}`} className="transition-opacity duration-300 ease-in-out">
          {idea ? (
            <>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{idea.title}</span>
                </CardTitle>
                <CardDescription className="text-sm">{idea.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-between items-center mb-2 text-xs">
                  <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                    <Users className="h-3 w-3" />
                    <span>{idea.servings}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                    <Clock className="h-3 w-3" />
                    <span>{idea.timeDescription}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                    <BarChart className="h-3 w-3" />
                    <span>{idea.difficulty}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                    <ThermometerSun className="h-3 w-3" />
                    <span>{idea.spiceLevel}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-3 w-3" />
                    <span>{idea.cuisine}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button onClick={() => onSelectRecipe(idea.id)} className="text-sm px-4 w-full sm:w-auto">
                    <ChefHat className="h-3 w-3 mr-2" />See Recipe
                  </Button>
                  <Button onClick={() => onGenerateSimilar(idea.id)} variant="outline" className="text-sm px-4 w-full sm:w-auto">
                    <Repeat className="h-3 w-3 mr-2" />Similar Ideas 
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <div className="flex justify-between items-center mt-4">
                  <Skeleton className="h-8 w-full sm:w-1/3" />
                  <Skeleton className="h-8 w-full sm:w-1/3 hidden sm:block" />
                </div>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}