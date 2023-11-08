// BOOTSTRAP IMPORTS
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

import "../App.css";

function CardComp({ name, types, description, imageUrl }) {
  return (
    <Card className="pokemon-card m-2" style={{ width: "18rem", height: "30rem" }}>
      <Card.Header className="card-header">{name}</Card.Header>
      <Card.Img variant="top" src={imageUrl} style={{
        // width: "10rem",
        height: "12.5rem",
        display: "block", // Ensures the image is treated as a block-level element
        margin: "auto",
      }} />
      <Card.Body className="pokemon-card-desc">
        {/* <Card.Title></Card.Title> */}
        <Card.Text className="card-text card-types">{types}</Card.Text>
        <Card.Text className="card-text card-description">{description}</Card.Text>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default CardComp;
