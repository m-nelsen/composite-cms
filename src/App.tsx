import { FC } from "react";
import { CompositeContext } from "./context/composite.tsx";
import NavBar from "./components/navbar/index.tsx";
import StoryBody from "./components/story_body/index.tsx";

import "./scss/styles.scss";

const App: FC = (props: any) => {
  return (
    <CompositeContext.Provider value={{ ...props }}>
      <NavBar />
      <div className="container">
        <StoryBody />
      </div>

      {/* <div className="container d-flex flex-column w-25 gap-3">
        <button className="btn btn-light">Light</button>
        <button className="btn btn-dark">Dark</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-info">Info</button>
        <button className="btn btn-success">Success</button>
        <button className="btn btn-warning">Warning</button>
        <button className="btn btn-danger">Danger</button>
      </div> */}
    </CompositeContext.Provider>
  );
};

export default App;
