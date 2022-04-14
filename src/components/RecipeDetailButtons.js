import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Spinner, Alert } from 'reactstrap';

import './RecipeDetailButtons.css';
import { api } from '../api';

export default function RecipeDetailButtons({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate()

  const handleDeleteRecipe = () => {

    setIsLoading(true);
    api
      .delete(`/recipes/${id}`)
      .then(() => navigate('/'))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba</Alert>;
  }

  return (
    <ButtonGroup>
      <Link className="btn btn-warning" href="/" to={`/recipe/${id}/update`}>
        Upraviť
      </Link>
      <Button onClick={handleDeleteRecipe} color="danger">
        Zmazať
      </Button>
    </ButtonGroup>
  );
}
