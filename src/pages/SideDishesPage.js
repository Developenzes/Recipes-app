import { useEffect, useState } from 'react';
import { Spinner, Alert, Container } from 'reactstrap';
import SideDishesTable from '../components/SideDishesTable';

import { api } from '../api';

export function SideDishesPage() {
  const [sideDishes, setSideDishes] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/recipes/side-dishes`)
      .then((res) => setSideDishes(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <h2>Prílohy</h2>
      {isLoading && <Spinner className="mb-4" />}
      {error && (
        <Alert color="danger">Vyskytla sa chyba pri načítaní dát</Alert>
      )}
      <SideDishesTable sideDishes={sideDishes} />
    </Container>
  );
}
