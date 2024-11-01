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
                <div className="flex justify-between items-center mb-2 text-xs">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{idea.servings}</span>
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    <span>{idea.timeDescription}</span>
                    <BarChart className="h-3 w-3 ml-4 mr-1" />
                    <span>{idea.difficulty}</span>
                    <ThermometerSun className="h-3 w-3 ml-4 mr-1" />
                    <span>{idea.spiceLevel}</span>
                    <Globe className="h-3 w-3 ml-4 mr-1" />
                    <span>{idea.cuisine}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button onClick={() => onSelectRecipe(idea.id)} className="text-sm px-4">
                    <ChefHat className='h-3 w-3' />See Recipe
                  </Button>
                  <Button onClick={() => onGenerateSimilar(idea.id)} variant="outline" className="text-sm px-4">
                  <Repeat className='h-3 w-3' /> Similar Ideas 
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
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-8 w-1/3" />
                </div>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}