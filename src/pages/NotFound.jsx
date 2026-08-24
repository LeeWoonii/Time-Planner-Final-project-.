import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="py-5">
        <div className="display-1 fw-bold text-primary">404</div>
        <h1>Page Not Found</h1>
        <p className="text-secondary">The page you requested does not exist.</p>
        <Link className="btn btn-primary" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}


export default NotFound;
