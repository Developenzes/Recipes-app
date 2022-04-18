import {Link, useNavigate} from "react-router-dom";
import { api } from '../api';
import { useState } from 'react';
import {Spinner, Alert} from "reactstrap";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  ButtonGroup, Button} from "reactstrap";
  import "./NewRecipePage.css"

export function NewRecipePage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({});

  // Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("")

  const handleRecipeData = (e) => {
    const newRecipe = {...recipe};
    newRecipe[e.target.id] = e.target.value;
    setRecipe(newRecipe);
  }

  const handleSubmitIngredients = () => {

    setIngredients([...ingredients, {
      id: ingredients.length + 1,
      name: ingredientName || groupName,
      amount: amount,
      amountUnit: amountUnit,
      isGroup: isGroup
    }]);

    setIngredientName("");
    setAmount("");
    setAmountUnit("");
    setGroupName("");
    setIsGroup(false);
  }

  const toAddGroup = (e) => {
    setGroupName(e.target.value);
    setIsGroup(true);
  }

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  }

  // POST request
  const submitNewRecipe = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api.post("/recipes", {
      title: recipe.title[0].toUpperCase() + recipe.title.substring(1),
      preparationTime: parseInt(recipe.preparationTime),
      servingCount: parseInt(recipe.servingCount),
      sideDish: recipe.sideDish,
      directions: recipe.directions,
      ingredients: ingredients
    }).then(() => navigate('/'))
    .catch(() => setError(true))
    .finally(() => setIsLoading(false));
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba</Alert>;
  }

  return (
    <div>
      <Form onSubmit={(e) => submitNewRecipe(e)}>
        <div className="header--buttons">
          <h2>{!recipe.title ? "Nový recept" : recipe.title}</h2>
          <ButtonGroup>
            <input className="btn btn-info" type="submit" value="Uložiť" />
            <Link className="btn btn-secondary" href="/" to={`/`}>
              Zrušiť
            </Link>
          </ButtonGroup>
        </div>
        <Input onChange={(e) => handleRecipeData(e)} id="title" defaultValue={recipe.title} type="text" placeholder="Názov" />
        <Row>
          <Col md={3}>
            <h4>Základné údaje</h4>
            <FormGroup className="basic-data">
              <Label htmlFor="preparationTime">Doba prípravy</Label>
              <div className="prepare-time" >
                <Input
                    onChange={(e) => handleRecipeData(e)}
                    defaultValue={recipe.preparationTime}
                    type="number"
                    id="preparationTime"
                  />
                <span>min</span>
              </div>
              <Label htmlFor="servingCount">Počet porcií</Label>
              <Input onChange={(e) => handleRecipeData(e)} id="servingCount" type="number" min="1" defaultValue={recipe.servingCount} />
              <Label htmlFor="sideDish">Príloha</Label>
              <Input onChange={(e) => handleRecipeData(e)} id="sideDish" type="text" name="sideDish" defaultValue={recipe.sideDish}/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <h4>Ingrediencie</h4>
            <FormGroup>
              <div>
                <Label htmlFor="isGroup">Pridať skupinu</Label>
                <div className="grid--container">
                  <Input
                    type="text"
                    id="isGroup"
                    placeholder="Nová skupina"
                    value={groupName}
                    onChange={toAddGroup}
                    />
                  <Button onClick={handleSubmitIngredients} disabled={groupName === ""} className="btn btn-success">Pridať</Button>
                </div>
              </div>
              <Label>Pridať ingredienciu</Label>
              <div className="grid--container">
                <Input
                  type="number"
                  placeholder="Množstvo"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  />
                <Input
                  type="text"
                  placeholder="Jednotka"
                  value={amountUnit}
                  onChange={e => setAmountUnit(e.target.value)}
                  />
                <Input
                  type="text"
                  placeholder="Názov"
                  value={ingredientName}
                  onChange={e => setIngredientName(e.target.value)}
                  />
                <Button onClick={handleSubmitIngredients} disabled={ingredientName === ""} className="btn btn-success">Pridať</Button>
              </div>
              <div className="ingredients-container">{ingredients.length === 0 && <p className="warn-notif">Zatiaľ žiadne ingrediencie</p>}
                <ul className="ingredients-list">
                  {ingredients.map(ingredient => <li key={ingredient.id}>
                    <div className="list-item">
                      <p>{ingredient.name}</p>
                      <p>{ingredient.amount}<span>{ingredient.amountUnit}</span></p>
                      <Button onClick={()=> handleDeleteIngredient(ingredient.id)}  className="btn btn-danger">X</Button>
                    </div>
                  </li>)}
                </ul>
              </div>
            </FormGroup>
          </Col>
          <Col md={5}>
            <h4>Postup</h4>
            <FormGroup>
              <Input className="textarea"
                onChange={(e) => handleRecipeData(e)}
                type="textarea"
                id="directions"
                name="directions"
                rows="20"
                value={recipe.directions}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
