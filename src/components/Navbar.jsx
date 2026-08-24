import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/" onClick={close}>
          TimePlanner Pro
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/" onClick={close}>
              Home
            </NavLink>
            <NavLink className="nav-link" to="/tasks" onClick={close}>
              Tasks
            </NavLink>
            <NavLink className="nav-link" to="/about" onClick={close}>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
