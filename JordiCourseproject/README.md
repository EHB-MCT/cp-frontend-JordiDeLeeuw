# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
	extends: [
		// Remove ...tseslint.configs.recommended and replace with this
		...tseslint.configs.recommendedTypeChecked,
		// Alternatively, use this for stricter rules
		...tseslint.configs.strictTypeChecked,
		// Optionally, add this for stylistic rules
		...tseslint.configs.stylisticTypeChecked,
	],
	languageOptions: {
		// other options...
		parserOptions: {
			project: ["./tsconfig.node.json", "./tsconfig.app.json"],
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
	plugins: {
		// Add the react-x and react-dom plugins
		"react-x": reactX,
		"react-dom": reactDom,
	},
	rules: {
		// other rules...
		// Enable its recommended typescript rules
		...reactX.configs["recommended-typescript"].rules,
		...reactDom.configs.recommended.rules,
	},
});
```

sources

[Custom Image Masks With Linear Gradients in CSS](https://www.digitalocean.com/community/tutorials/css-masking-with-mask-image) first used in Scene1 on line 5-7

[Framer motion onscroll animation using useTransform](https://stackoverflow.com/questions/77332097/framer-motion-onscroll-animation-using-usetransform) first used in Scene1 on line 9, 14-18 and 21-23

[Problem with scrollYProgress](https://www.framer.community/c/developers/problem-with-scrollyprogress#comment_wrapper_31225038) first used in scene1 on line 49-51
[useGLTF Hook](https://sbcode.net/react-three-fiber/use-gltf/) used throughout scene4
[Creating a draggable element with limits and smooth animations using Framer-Motion](https://dev.to/ayka_code/creating-a-draggable-element-with-limits-and-smooth-animations-using-framer-motion-2cki) used in scene 5 line 11 and 47-51
