import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        SymReact
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Customers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Invoices
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-1">
            <a href="#" className="nav-link">
              Registration
            </a>
          </li>
          <li className="nav-item mr-1">
            <a href="#" className="btn btn-primary">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="btn btn-danger">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
