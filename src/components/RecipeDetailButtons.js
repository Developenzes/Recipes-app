import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonGroup, Button, Spinner, Alert } from 'reactstrap';
import { api } from '../api';
import { useSnackbar } from 'react-simple-snackbar'
import './RecipeDetailButtons.css';

export default function RecipeDetailButtons({ id, slug}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const handleDeleteRecipe = () => {
    if(window.confirm("Si si istá, že chceš tento recept vymazať?") === true) {
      closeSnackbar();
      setIsLoading(true)
    api
      .delete(`/recipes/${id}`)
      .then(() => {
        openSnackbar("Recept vymazaný", [3000]);
        navigate('/')
      })
      .catch(() => {setError(true)})
      .finally(() => setIsLoading(false))
    }

  };

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba</Alert>;
  }

  return (
    <ButtonGroup>
      <Link id={id} className="btn btn-warning" href="/" to={`/recipe/${slug}/update`}>
        Upraviť
      </Link>
      <Button onClick={handleDeleteRecipe} color="danger">
        Zmazať
      </Button>
    </ButtonGroup>
  );
}
