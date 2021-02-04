import "./App.css";
import EstimateForm from "./components/EstimateForm";

import "./components/styles/Overrides.css";

function App() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          alt=""
          style={{ maxHeight: "-webkit-fill-available" }}
          src="https://img1.wsimg.com/isteam/ip/00169b59-da67-4bbf-9c7c-e656dba9028e/finelinewhite.png"
        ></img>
      </div>
      <EstimateForm />
    </div>
  );
}

export default App;
