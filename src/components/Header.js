import { Navbar, Container, NavbarBrand } from 'reactstrap';
import NavLinks from './NavLinks';
import './Header.css';

export default function Header() {
  return (
    <Navbar color="dark" dark>
      <Container className="navigation">
        <NavbarBrand href="/">Cookbook</NavbarBrand>
        <NavLinks />
      </Container>
    </Navbar>
  );
}
