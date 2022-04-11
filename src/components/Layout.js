import { Container } from 'reactstrap';

import Footer from './Footer';
import Header from './Header';

export function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="mt-4">{children}</Container>
      <Footer />
    </>
  );
}
