import './NavLinks.css';
import { NavLink } from 'react-router-dom';

export default function NavLinks() {
  return (
    <div>
      <NavLink to="/" className="nav--link">
        Recepty
      </NavLink>
      <NavLink to="/side-dishes" className="nav--link">
        Prílohy
      </NavLink>
    </div>
  );
}
