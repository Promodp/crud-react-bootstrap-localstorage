import React, { useState } from "react";
import { Table, FormControl } from "react-bootstrap";
import { useTodo } from "../TodoContext";

const TaskList = ({
  handleEdit,
  handleSort,
  handleDelete,
  handleComplete,
  setSortOrder,
}) => {
  const { lists } = useTodo();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSortClick = (field) => {
    setSortOrder((prevSortOrder) => ({
      field,
      ascending:
        prevSortOrder.field === field ? !prevSortOrder.ascending : true,
    }));
    handleSort(field);
  };

  const filteredLists = lists.filter(
    (list) =>
      list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      list.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4>List of todo items:</h4>
      <FormControl
        type="text"
        placeholder="Search by task title or description"
        className="mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Task No</th>
            <th onClick={() => handleSortClick("title")}>
              Title <i className="fas fa-sort"></i>
            </th>
            <th onClick={() => handleSortClick("description")}>
              Description <i className="fas fa-sort"></i>
            </th>
            <th onClick={() => handleSortClick("dueDate")}>
              Due Date <i className="fas fa-sort"></i>
            </th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLists.map((item, index) => (
            <tr
              key={index}
              style={{
                textDecoration: item.completed ? "line-through" : "",
              }}
            >
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.dueDate}</td>
              <td>{item.priority}</td>
              <td>
                <span
                  className="mr-4 text-success"
                  style={{ cursor: "pointer", marginRight: "6px" }}
                  onClick={() => handleEdit(index)}
                >
                  <i className="fas fa-edit"></i>
                </span>
                <span
                  className="mr-4 text-danger"
                  style={{ cursor: "pointer", marginRight: "6px" }}
                  onClick={() => handleDelete(index, item.title)}
                >
                  <i className="far fa-trash-alt"></i>
                </span>
                {!item.completed && (
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleComplete(index)}
                  >
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskList;
