import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type RecipeIdea = {
  id: string
  title: string
  description: string
}

type FullRecipe = {
  id: string
  title: string
  ingredients: string[]
  instructions: string[]
}

type RecipeIdeasProps = {
  ideas: RecipeIdea[]
  onSelectRecipe: (recipe: FullRecipe) => void
}

export function RecipeIdeas({ ideas, onSelectRecipe }: RecipeIdeasProps) {
  const handleSelectRecipe = (idea: RecipeIdea) => {
    // Placeholder: Generate a mock full recipe
    const mockFullRecipe: FullRecipe = {
      id: idea.id,
      title: idea.title,
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      instructions: ['Step 1', 'Step 2', 'Step 3'],
    }
    onSelectRecipe(mockFullRecipe)
  }

  return (
    <div className="space-y-6">
      {ideas.map((idea) => (
        <Card key={idea.id}>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>{idea.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => handleSelectRecipe(idea)}>View Full Recipe</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}