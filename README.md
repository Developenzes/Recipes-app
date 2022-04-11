# CNU Cookbook

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## API Documentation

Documentation of API used for this project.

API URL: **https://exercise.cngroup.dk/api**

### Types

Types are derived from the API results, some field might be missing!

#### Recipe

```
{
  _id: Int,
  title: string !required,
  preparationTime: Int,
  servingCount: Int,
  directions: string
  ingredients: Array[Ingredient],
  slug: string,
  lastModifiedDate: Date,
  isMarkdown: Boolean
  sideDish: string
  __v: Int
}
```

#### Ingredient

```
{
  _id: Int,
  name: string,
  amount: Int,
  amountUnit: string,
  isGroup: Boolean
}
```

### Endpoints

#### /recipes

- Method: **GET**
- Returns: List all available recipes

#### /recipes/:slug

- Method: **GET**
- :slug can be replaced with :id
- Returns: All information available about recipe (based on slug or id)

#### /recipes/ingredients

- Method: **GET**
- Returns: List of all ingredients avaliabel, lists only their names in string array.

#### /recipes/side-dishes

- Method: **GET**
- Returns: List of all side-dishes, string array.

#### /recipes

- Method: **POST**
- Content-type: application/json
- Creates a new recipe
- Required fields and default values:

  ```
  {
    title: String, //required field for user
    preparationTime: Int,
    servingCount: Int,
    sideDish: String,
    directions: String,
    ingredients: Array<{
        amount: Int,
        amountUnit: String,
        isGroup: Boolean,
        name: String,
    }>
  }
  ```

- Returns: Simplified recipe object, same that is returned in recipe list or error.

#### /recipes/:id

- Method: **POST**
- Content-type: application/json
- Edits an existing recipe
- Only edited fields can be sent
- Returns: Simplified recipe object, same that is returned in recipe list or error.

#### /recipes/:id

- Method: **DELETE**
- Deletes existing recipe
- Returns: 200 OK
