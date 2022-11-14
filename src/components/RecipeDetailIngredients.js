import { Table, Input } from 'reactstrap';
import './RecipeDetailIngredients.css';
import { useState } from 'react';

export default function RecipeDetailIngredients({ ingredients, servingCount }) {

  const [newServingCount, setNewServingCount] = useState(servingCount)

  return (
    <div>
      {servingCount && (
        <div className="serving--count">
          <span>Počet porcií:</span>
          <Input type="number" min="1" defaultValue={servingCount} onChange={(e) => setNewServingCount(e.target.value)} />
        </div>
      )}
      <Table striped>
        <tbody>
          {ingredients?.map((ingredient) => {

          const oneServingCount = ingredient.amount / servingCount

          return (
            ingredient.isGroup ? (
              <tr key={ingredient._id} className="text-center">
                <td colSpan={3} className="table-primary">
                  <span className="highlighted">{ingredient.name}</span>
                </td>
              </tr>
            ) : (
              <tr key={ingredient._id}>
                <td className="text-alighn-right">{!ingredient.amount ? "" : (oneServingCount * newServingCount)}</td>
                <td>{ingredient.amountUnit}</td>
                <td>{ingredient.name}</td>
              </tr>
            ))}
          )}
        </tbody>
      </Table>
    </div>
  );
}