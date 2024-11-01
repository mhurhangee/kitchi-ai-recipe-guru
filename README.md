# TODO

- Substitutions
- Increased options in form
- Better form layout and design
- Scroll areas inside card
- Change options for number of suggestions
- No ingredients then random recipe
- Darkmode

Now I want to think about including interactive features. That modify and improve the recipe. This will likely require a new API route (maybe called tweaks. Ideally the tweaks will only return parts of the recipe that have changed to save tokens?

Next to each ingredient a small substitution button (small icon), that opens a dropdown with LLM generated substitution options, then selecting one from the menu updates the recipe, maybe include a 'Remove ingredient button'. Or maybe a better way to do it would be to allow multiple substitutions at once somehow? Perhaps via a modal?

Maybe a small "tips and tricks" button next to each step in the recipe that the user can click to update the recipe and get help, tips and tricks on that stage.

Maybe a button that brings up an input so the user can manually enter a prompt to modify the recipe maybe as a dialog?

A copy to clipboard functionality for the recipe.

Format the instructions to make all the listed ingredients bold (probably just a simple regex or find and replace job) nothing too complex.

Overall, I am not sure how best to implement the tweaks functionality. I want to balance UX and limited excessive amounts of API calls. Not sure how best to achieve flexibility and this balance so would welcome your input.