import React, { useState } from "react";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";
import "../App.css";



function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <Navbar bg="danger" data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand href="#"><h1>Pokémon Cards</h1></Navbar.Brand>
        <Form className="ms-auto">
          <FormControl
            type="text"
            placeholder="Search for a Pokémon"
            onChange={handleSearch}
          />
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
