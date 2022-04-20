import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../api';
import { Container, Alert, Spinner, Row, Col } from 'reactstrap';
import RecipeDetailIngredients from '../components/RecipeDetailIngredients';
import RecipeDetailButtons from '../components/RecipeDetailButtons';
import { toHoursAndMinutes } from '../helpers';
import { FaRegClock } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown'
import './RecipeDetailPage.css';

export function RecipeDetailPage() {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((response) => setRecipe(response.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [slug]);


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  return (
    <Container>
      <div className="header--buttons">
        <h1>{recipe.title}</h1>
        <RecipeDetailButtons id={recipe._id} slug={slug}/>
      </div>
      <Row>
        <Col lg={4}>
          <div className="prepare--time">
            <h5>
              <FaRegClock className="clock--icon" />
              {toHoursAndMinutes(recipe.preparationTime)}
            </h5>
            {recipe.sideDish && <h6>Príloha: {recipe.sideDish}</h6>}
          </div>
          <RecipeDetailIngredients
            ingredients={recipe.ingredients}
            servingCount={recipe.servingCount}
          />
        </Col>
        <Col lg={8} className="markdown-container">
          <ReactMarkdown>{recipe.directions}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  );
}
