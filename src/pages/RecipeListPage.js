import { useEffect, useState } from 'react';
import RecipeList from '../components/RecipesList';
import SearchInput from '../components/SearchInput';
import { api } from '../api';
import { Container, Spinner, Alert } from 'reactstrap';

export function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((response) => setRecipes(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Container>
      <h1>Recepty</h1>
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
