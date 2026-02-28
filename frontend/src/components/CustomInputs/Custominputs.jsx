import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const Custominputs = ({ label, icon, ...rest }) => {
  return (
    <Form.Group className="mb-4" controlId={label}>
      <Form.Label className="small text-secondary mb-0">{label}</Form.Label>
      <InputGroup className="overflow-hidden rounded-3">
        <InputGroup.Text className="border-0">{icon}</InputGroup.Text>
        <Form.Control className="py-2 border-0" {...rest} />
      </InputGroup>
    </Form.Group>
  );
};

export default Custominputs;
