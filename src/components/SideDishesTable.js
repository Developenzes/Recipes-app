import { Table } from 'reactstrap';
import './SideDishesTable.css';

export default function SideDishesTable({ sideDishes }) {
  return (
    <Table striped className="table--dishes">
      <thead>
        <tr>
          <th className="index--width">Index</th>
          <th>Príloha</th>
        </tr>
      </thead>
      <tbody>
        {sideDishes?.map((sideDish, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{sideDish}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
