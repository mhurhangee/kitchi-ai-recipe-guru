import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type RecipeIdea = {
  id: string
  title: string
  description: string
}

type RecipeIdeasProps = {
  ideas: RecipeIdea[]
  onSelectRecipe: (recipeId: string) => void
  isLoading: boolean
}

export function RecipeIdeas({ ideas, onSelectRecipe, isLoading }: RecipeIdeasProps) {
  if (isLoading) {
    return (
      <div className="space-y-6" key="skeleton">
        {[1, 2, 3].map((_, index) => (
          <Card key={`loading-${index}`}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6" key="real">
      {ideas.map((idea) => (
        <Card key={idea.id}>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>{idea.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => onSelectRecipe(idea.id)}>View Full Recipe</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}