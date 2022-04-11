import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import './RecipeCard.css';
import { toHoursAndMinutes } from '../helpers';

import placeholder from '../images/food-placeholder.png';

export default function RecipeCard({ title, preparationTime, slug }) {
  return (
    <Link className="card-link" href="/" to={`recipe/${slug}`}>
      <Card className="h-100">
        <CardImg alt="Preview" src={placeholder} top></CardImg>
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle>{toHoursAndMinutes(preparationTime)}</CardSubtitle>
        </CardBody>
      </Card>
    </Link>
  );
}
