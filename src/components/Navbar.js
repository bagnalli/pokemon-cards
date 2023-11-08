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
    <Navbar className="navbar" data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand href="#"><h1>Pokémon</h1>        </Navbar.Brand>
        <img
          alt=""
          src="https://archives.bulbagarden.net/media/upload/thumb/9/9a/0151Mew.png/1200px-0151Mew.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
        />
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
