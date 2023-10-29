// BOOTSTRAP IMPORTS
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

import "../App.css";

function CardComp({ name, types, description, imageUrl }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{types}</Card.Text>
        <Card.Text>{description}</Card.Text>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}

export default CardComp;
