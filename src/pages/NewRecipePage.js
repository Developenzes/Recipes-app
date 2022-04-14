import {Link} from "react-router-dom";
import { api } from '../api';
import { useState } from 'react';
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

  const [data, setData] = useState({
    title:"",
    preparationTime:"",
    servingCount:"",
    sideDish:"",
    directions:"",
  })

  function handleRecipeData(e) {
    const newData = {...data};
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  // Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmitIngredients() {

    setIngredients([...ingredients, {
      id: ingredients.length + 1,
      name: ingredientName,
      amount: amount,
      amountUnit: amountUnit
    }]);

    setIngredientName("");
    setAmount("");
    setAmountUnit("");
  }

  function handleDeleteIngredient(id) {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  }

  // POST request
  function submitNewRecipe(e) {
    e.preventDefault();
    api.post("/recipes", {
      title: data.title,
      preparationTime: parseInt(data.preparationTime),
      servingCount: parseInt(data.servingCount),
      sideDish: data.sideDish,
      directions: data.directions,
      ingredients: ingredients
    }).then((response) => {console.log(response.data)})
  }

  return (
  <div>
    <Form onSubmit={(e) => submitNewRecipe(e)}>
      <div className="header--buttons">
        <h2>Nový recept</h2>
        <ButtonGroup>
          <input className="btn btn-info" type="submit" value="Uložiť" />
          <Link className="btn btn-secondary" href="/" to={`/`}>
            Zrušiť
          </Link>
        </ButtonGroup>
      </div>
      <Input onChange={(e) => handleRecipeData(e)} id="title" defaultValue={data.title} type="text" placeholder="Názov" />
      <Row>
        <Col md={3}>
          <h4>Základné údaje</h4>
          <FormGroup className="basic-data">
            <Label htmlFor="preparationTime">Doba prípravy</Label>
            <div className="prepare-time" >
              <Input
                  onChange={(e) => handleRecipeData(e)}
                  value={data.preparationTime}
                  type="number"
                  id="preparationTime"
                />
              <span>min</span>
            </div>
            <Label htmlFor="servingCount">Počet porcií</Label>
            <Input onChange={(e) => handleRecipeData(e)} id="servingCount" type="number" min="1" defaultValue={data.servingCount} />
            <Label htmlFor="sideDish">Príloha</Label>
            <Input onChange={(e) => handleRecipeData(e)} id="sideDish" type="text" name="sideDish" defaultValue={data.sideDish}/>
          </FormGroup>
        </Col>
        <Col md={4}>
          <h4>Ingrediencie</h4>
          <FormGroup>
            <div>{ingredients.length === 0 && <p>Zatiaľ žiadne ingrediencie</p>}
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
            <div>
              <Label htmlFor="toAddGroup">Pridať skupinu</Label>
              <div className="grid--container">
                <Input
                  type="text"
                  id="toAddGroup"
                  placeholder="Nová skupina"
                  />
                <Button className="btn btn-success">Pridať</Button>
              </div>
            </div>
          </FormGroup>
        </Col>
        <Col md={5}>
          <h4>Postup</h4>
          <FormGroup>
            <Input
              onChange={(e) => handleRecipeData(e)}
              type="textarea"
              id="directions"
              name="directions"
              rows="20"
              defaultValue={data.directions}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  </div>
  );
}
