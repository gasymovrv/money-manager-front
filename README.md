# Money-Manager (frontend)
The main purpose of the application is to manage income, expenses and savings.

Application is deployed at https://money-manager.ddns.net.

It is a single page frontend application bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Here is a backend part: https://github.com/gasymovrv/money-manager-back

Material-UI components are used for styling.

Redux is used to store global state in memory and some custom UI configurations in local storage.

No class components, only functional ones with React Hooks.

Core technologies:
+ TypeScript 
+ React 17.0.2 
+ Material-UI 4.11.1 
+ Redux
+ NodeJS
+ NPM

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Add `GENERATE_SOURCEMAP=false` environment variable (or .env) to remove the source map, or change the build script in package-json:
```
"build": "GENERATE_SOURCEMAP=false react-scripts build",
"win-build": "set \"GENERATE_SOURCEMAP=false\" && react-scripts build"
```
Your app is ready to be deployed!

You can test it on local server by command `serve -s build`

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
