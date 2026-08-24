function About() {
  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h1 className="fw-bold">About TimePlanner Pro</h1>
          <p className="lead">
            A simple multi-page React application for managing tasks and deadlines.
          </p>
          <hr />
          <div className="row g-4">
            <div className="col-md-4">
              <h5>Organize</h5>
              <p className="text-secondary mb-0">
                Keep work, personal, and study tasks together.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Persist</h5>
              <p className="text-secondary mb-0">
                Your tasks are stored in the browser and synchronized across tabs.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Remember</h5>
              <p className="text-secondary mb-0">
                Timed checks help notify you when a task is due.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default About;
