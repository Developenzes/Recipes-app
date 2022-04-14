import { useEffect, useState } from 'react';
import RecipeList from '../components/RecipesList';
import SearchInput from '../components/SearchInput';
import { api } from '../api';
import {Link} from "react-router-dom";
import {
  Container,
  Spinner,
  Alert,
} from 'reactstrap';
import './RecipeListPage.css';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  //const [isNewRecipe, setIsNewRecipe] = useState(false);

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(recipes);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );


  return (
    <Container>
      <div className="header--container">
        <h1>Recepty</h1>
        <Link href="/" to={`/recipe/new-recipe`} className="btn btn-info">
          Nový recept
        </Link>
      </div>
      <SearchInput
        className="mb-4"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {isLoading && <Spinner className="mb-4" />}
      {error && (
        <Alert color="danger">Vyskytla sa chyba pri načítaní dát</Alert>
      )}
      <RecipeList recipes={filteredRecipes} />
    </Container>
  );
}
