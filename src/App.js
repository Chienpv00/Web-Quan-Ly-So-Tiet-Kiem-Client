import { Outlet } from "react-router-dom";
import Login from "./page/Login/Login";

function App() {
  return (
    <div className="App">
        <Outlet/>
    </div>
  );
}

export default App;
