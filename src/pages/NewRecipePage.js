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
  ButtonGroup,
  Button,
  FormFeedback} from "reactstrap";
  import { nanoid } from 'nanoid';
  import ReactMarkdown from "react-markdown";
  import { useSnackbar } from 'react-simple-snackbar';
  import "./NewRecipePage.css";

  const initialValues = {
    title: "",
    preparationTime: "",
    servingCount: "",
    sideDish: "",
    directions: "",
    ingredients: []
  }

export function NewRecipePage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [openSnackbar, closeSnackbar] = useSnackbar();

  const [values, setValues] = useState(initialValues);
  const [ingredientName, setIngredientName] = useState("");
  const [amountUnit, setAmountUnit] = useState("");
  const [amount, setAmount] = useState("");
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  const handleSubmitIngredients = () => {

    const ingredients = [...values.ingredients, {
      tempId: nanoid(),
      name: ingredientName || groupName,
      amount: amount,
      amountUnit: amountUnit,
      isGroup: isGroup
    }];

    setValues({ ...values, ingredients });

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
    setValues({ ...values, ingredients: values.ingredients.filter(ingredient => (ingredient._id || ingredient.tempId) !== id) });
  }

  // POST request
  const submitNewRecipe = (e) => {
    e.preventDefault();
    closeSnackbar();
    setIsLoading(true);
    api.post("/recipes", {
      ...values,
      title: values.title[0].toUpperCase() + values.title.substring(1)
    })
    .then(() => {
      openSnackbar("Recept ??spe??ne ulo??en??", [3000]);
      navigate("/");
    })
    .catch(() => {
      openSnackbar("Nie??o sa posr...", [3000]);
      setError(true);
    })
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
          <h2>{!values.title ? "Nov?? recept" : values.title}</h2>
          <ButtonGroup>
            <input disabled={!values.title} className="btn btn-info" type="submit" value="Ulo??i??" />
            <Link className="btn btn-secondary" href="/" to={`/`}>
              Zru??i??
            </Link>
          </ButtonGroup>
        </div>
        <Input invalid={!values.title} onChange={handleInputChange} name="title" id="title" defaultValue={values.title} type="text" placeholder="N??zov" label="Title" />
        <FormFeedback >N??zov receptu je povinn??</FormFeedback>
        <Row>
          <Col md={3}>
            <h4>Z??kladn?? ??daje</h4>
            <FormGroup className="basic-data">
              <Label htmlFor="preparationTime">Doba pr??pravy</Label>
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
              <Label htmlFor="servingCount">Po??et porci??</Label>
              <Input onChange={handleInputChange} id="servingCount" type="number" min="1" defaultValue={values.servingCount} name="servingCount" label="ServingCount" />
              <Label htmlFor="sideDish">Pr??loha</Label>
              <Input onChange={handleInputChange} id="sideDish" type="text" name="sideDish" defaultValue={values.sideDish} label="SideDish"/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <h4>Ingrediencie</h4>
            <FormGroup>
              <div>
                <Label htmlFor="isGroup">Prida?? skupinu</Label>
                <div className="grid--container">
                  <Input
                    type="text"
                    id="isGroup"
                    placeholder="Nov?? skupina"
                    value={groupName}
                    onChange={toAddGroup}
                    />
                  <Button onClick={handleSubmitIngredients} disabled={groupName === ""} className="btn btn-success">Prida??</Button>
                </div>
              </div>
              <Label>Prida?? ingredienciu</Label>
              <div className="grid--container">
                <Input
                  type="number"
                  placeholder="Mno??stvo"
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
                  placeholder="N??zov"
                  value={ingredientName}
                  onChange={e => setIngredientName(e.target.value)}
                  />
                <Button onClick={handleSubmitIngredients} disabled={ingredientName === ""} className="btn btn-success">Prida??</Button>
              </div>
              <div className="ingredients-container">{values.ingredients.length === 0 && <p className="warn-notif">Zatia?? ??iadne ingrediencie</p>}
                <ul className="ingredients-list">
                  {values.ingredients.map(ingredient => <li key={ingredient._id || ingredient.tempId}>
                    <div className="list-item">
                      <p>{ingredient.name}</p>
                      <p>{ingredient.amount}<span>{ingredient.amountUnit}</span></p>
                      <Button onClick={()=> handleDeleteIngredient(ingredient._id || ingredient.tempId)}  className="btn btn-danger">X</Button>
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
      <div className="markdown-container">
        <h3>N??h??ad postupu</h3>
        <ReactMarkdown>{values.directions}</ReactMarkdown>
      </div>
    </div>
  );
}
