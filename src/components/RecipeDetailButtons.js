import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from 'reactstrap';
import './RecipeDetailButtons.css';

export default function RecipeDetailButtons({ slug }) {
  return (
    <ButtonGroup>
      <Link className="btn btn-warning" href="/" to={`/recipe/${slug}/update`}>
        Upraviť
      </Link>
      <Button color="danger">Zmazať</Button>
    </ButtonGroup>
  );
}
