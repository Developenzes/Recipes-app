import { Container } from 'reactstrap';

export default function Footer() {
  return (
    <Container as="footer">
      <hr />
      <p>&copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.</p>
    </Container>
  );
}
