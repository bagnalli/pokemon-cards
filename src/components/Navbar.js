import React, { useState } from "react";
import { Navbar, Container, Form, FormControl } from "react-bootstrap";

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
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
