import RecipeCard from '../components/RecipeCard';
import { Row, Col } from 'reactstrap';

export default function RecipeList({ recipes }) {
  return (
    <Row className="gy-4">
      {recipes.map((recipe) => (
        <Col key={recipe._id} lg={3} md={4} sm={6} xs={12}>
          <RecipeCard
            title={recipe.title}
            preparationTime={recipe.preparationTime}
            slug={recipe.slug}
          />
        </Col>
      ))}
    </Row>
  );
}
