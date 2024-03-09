import { Button, Form } from 'react-bootstrap';

const Forms = ({  handleChange, list, saveData }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    saveData();
  };

  return (     
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={list.title || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={list.description || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formDueDate">
        <Form.Label>Due Date:</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={list.dueDate || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPriority">
        <Form.Label>Priority:</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={list.priority}
          onChange={handleChange}
        >
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
        </Form.Control>
      </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: "15px" }}>
          Add Task
        </Button>
    </Form>
  );
};

export default Forms;
