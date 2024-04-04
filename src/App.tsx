import "./scss/styles.scss";

function App() {
  return (
    <>
      <nav className="nav flex-column">
        <a className="nav-link active" aria-current="page" href="#">
          Active
        </a>
        <a className="nav-link" href="#">
          Link
        </a>
        <a className="nav-link" href="#">
          Link
        </a>
        <a className="nav-link disabled" aria-disabled="true">
          Disabled
        </a>
      </nav>
      <div className="container d-flex flex-column w-25 gap-3">
        <button className="btn btn-light">Light</button>
        <button className="btn btn-dark">Dark</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-info">Info</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-danger">Danger</button>
      </div>
    </>
  );
}

export default App;
