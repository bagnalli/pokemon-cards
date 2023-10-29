import "./App.css";
import Container from "react-bootstrap/Container";
import NavBar from "./components/Navbar";
import Pokemon from "./components/Pokemon";
import { useState } from 'react'; // Import useState

function App() {
  const [searchKeyword, setSearchKeyword] = useState(""); // Initialize searchKeyword state

  return (
    <>
      <NavBar onSearch={setSearchKeyword} /> {/* Pass the setSearchKeyword function to NavBar */}
      <Container>
        <Pokemon searchKeyword={searchKeyword} /> {/* Pass the searchKeyword prop to Pokemon */}
      </Container>
    </>
  );
}

export default App;
