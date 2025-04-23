import { defineConfig } from 'vite';
export default defineConfig({
  root: '.',
  // Use an absolute base path for GitHub Pages ⬇️
  // If this repo is <username>.github.io keep '/'; if it’s a project page, use '/<repo>/'
  base: '/',
});
```js
import { defineConfig } from 'vite';
export default defineConfig({
  root: '.',
  base: './',
});
