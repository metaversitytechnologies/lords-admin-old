import "jquery";
import "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/styles.css";
import "./styles/theme.css";
import "./styles/custom.css";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Login />
      <Footer />
    </>
  );
}

export default App;
