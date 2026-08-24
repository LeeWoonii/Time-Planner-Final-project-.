import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero py-5">
      <div className="container py-5 text-center">
        <span className="badge text-bg-light text-primary mb-3">Plan smarter</span>
        <h1 className="display-4 fw-bold">Own your time.</h1>
        <p className="lead mx-auto mb-4">
          Create tasks, stay organized, and keep every deadline where you can see it.
        </p>
        <Link className="btn btn-light btn-lg px-4" to="/tasks">
          Open my planner
        </Link>
        <div className="row g-3 mt-5 text-start">
          <div className="col-md-4">
            <div className="feature-card">Create tasks quickly</div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">Track categories</div>
          </div>
          <div className="col-md-4">
            <div className="feature-card">Never miss a reminder</div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default Home;
