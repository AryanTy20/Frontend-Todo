import "./app.scss";

import { Todo } from "./Components";

const App = () => {
  return (
    <>
      <Todo />
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/AryanTy20">Aryan Tirkey</a>.
      </div>
    </>
  );
};

export default App;
