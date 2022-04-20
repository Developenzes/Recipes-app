import { Table, Input } from 'reactstrap';
import './RecipeDetailIngredients.css';

export default function RecipeDetailIngredients({ ingredients, servingCount }) {
  return (
    <div>
      {servingCount && (
        <div className="serving--count">
          <span>Počet porcií:</span>
          <Input type="number" min="1" defaultValue={servingCount} />
        </div>
      )}
      <Table striped>
        <tbody>
          {ingredients?.map((ingredient) =>
            ingredient.isGroup ? (
              <tr key={ingredient._id} className="text-center">
                <td colSpan={3} className="table-primary">
                  <span className="highlighted">{ingredient.name}</span>
                </td>
              </tr>
            ) : (
              <tr key={ingredient._id}>
                <td className="text-alighn-right">{ingredient.amount}</td>
                <td>{ingredient.amountUnit}</td>
                <td>{ingredient.name}</td>
              </tr>
            ),
          )}
        </tbody>
      </Table>
    </div>
  );
}
