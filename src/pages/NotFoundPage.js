import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1>404 - Not found!</h1>
      <h4>This is not the page you are looking for.</h4>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary btn-lg" role="button">
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
