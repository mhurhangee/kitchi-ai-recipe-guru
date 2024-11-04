# Kitchi: AI Recipe Generator 🧑‍🍳

An AI-powered recipe generator built with Next.js, AI SDK, and Vercel that helps you discover new recipes based on your ingredients, dietary preferences, and culinary interests.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmhurhangee%2Fkitchi-ai-recipe-guru.git)

## Features

- Generate recipe ideas based on:
  - Available ingredients
  - Cuisine preferences
  - Dietary requirements
  - Serving size
  - Difficulty level
  - Spice level
  - Time constraints
- Exclude unwanted ingredients
- Get detailed recipes with step-by-step instructions
- Responsive design for all devices
- Dark mode support
- Customizable AI model configuration with support for multiple providers

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kitchi-ai-recipe-guru.git
cd kitchi-ai-recipe-guru
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your environment variables. The required variables will depend on your chosen AI provider in step 4. For example, if using OpenAI:
```
OPENAI_API_KEY=your_api_key_here
```

4. Configure the AI model in `lib/model.ts`. You can choose your preferred provider and model:
```typescript
import { openai } from '@ai-sdk/openai'
// e.g. import { anthropic } from '@ai-sdk/anthropic'

export const MODEL = openai('gpt-4o-mini') // Or, for example, use anthropic() with their respective models
export const TEMPERATURE = 0.7 // Adjust creativity
export const MAX_TOKENS = 1024 // Set maximum response length
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quick Deploy

Click the "Deploy with Vercel" button above to create a copy of this project in your GitHub account and deploy it to Vercel. Remember to add the necessary environment variables (e.g., `OPENAI_API_KEY`) in your Vercel project settings, depending on your chosen AI provider.

## Customizing the AI Provider

Kitchi supports multiple AI providers through the Vercel AI SDK. To change the provider:

1. Update the import statement in `lib/model.ts` to use your preferred provider.
2. Change the `MODEL` constant to use the new provider and model.
3. Update your environment variables to include the necessary API keys for the new provider.
4. If needed, adjust the `TEMPERATURE` and `MAX_TOKENS` values to suit the new model's requirements.

For more information on available providers and models, refer to the [Vercel AI SDK documentation](https://sdk.vercel.ai/docs/foundations/providers-and-models).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or feedback, please contact: m.hurhangee@me.com