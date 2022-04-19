import {Link, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useState, useEffect } from 'react';
import {Spinner, Alert} from "reactstrap";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  ButtonGroup, Button} from "reactstrap";

  const initialValues = {
    title: "",
    preparationTime: "",
    servingCount: "",
    sideDish: "",
    directions: "",
    ingredients: []
  }


export function RecipeUpdatePage() {

  const { slug } = useParams();
  //const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    setIsLoading(true);

    api
      .get(`/recipes/${slug}`)
      .then((response) => setValues(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [slug]);


  // Ingredients
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("")


  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
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
      title: values.title[0].toUpperCase() + values.title.substring(1),
      preparationTime: parseInt(values.preparationTime),
      servingCount: parseInt(values.servingCount),
      sideDish: values.sideDish,
      directions: values.directions,
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
          <h2>{!values.title ? "Nový recept" : values.title}</h2>
          <ButtonGroup>
            <input className="btn btn-info" type="submit" value="Uložiť" />
            <Link className="btn btn-secondary" href="/" to={`/`}>
              Zrušiť
            </Link>
          </ButtonGroup>
        </div>
        <Input onChange={handleInputChange} name="title" id="title" defaultValue={values.title} type="text" placeholder="Názov" label="Title" />
        <Row>
          <Col md={3}>
            <h4>Základné údaje</h4>
            <FormGroup className="basic-data">
              <Label htmlFor="preparationTime">Doba prípravy</Label>
              <div className="prepare-time" >
                <Input
                    onChange={handleInputChange}
                    defaultValue={values.preparationTime}
                    name="preparationTime"
                    label="PreparationTime"
                    type="number"
                    id="preparationTime"
                  />
                <span>min</span>
              </div>
              <Label htmlFor="servingCount">Počet porcií</Label>
              <Input onChange={handleInputChange} id="servingCount" type="number" min="1" defaultValue={values.servingCount} name="servingCount" label="ServingCount" />
              <Label htmlFor="sideDish">Príloha</Label>
              <Input onChange={handleInputChange} id="sideDish" type="text" name="sideDish" defaultValue={values.sideDish} label="SideDish"/>
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
                onChange={handleInputChange}
                type="textarea"
                id="directions"
                name="directions"
                label="Directions"
                rows="20"
                defaultValue={values.directions}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

