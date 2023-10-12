import "./App.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/Navbar";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Pokemon />
      </Container>
    </>
  );
}

export default App;
