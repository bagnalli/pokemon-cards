import "./App.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/Navbar";
import Pokemon from "./components/Pokemon";
import { useState } from 'react'; // Import useState

function App() {
  const [searchKeyword, setSearchKeyword] = useState(""); // Initialize searchKeyword state

  return (
    <>
      <NavBar onSearch={setSearchKeyword} />
      <Container className="m-4">
        <Pokemon searchKeyword={searchKeyword} />
      </Container>
    </>
  );
}

export default App;
