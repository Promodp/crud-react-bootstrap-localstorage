import React, { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import TaskList from "./components/TaskList";
import Forms from "./components/Forms";
import "./App.css";

const App = () => {
  const initialUsers = JSON.parse(localStorage.getItem("users")) || [
    {
      title: "Task 1",
      description: "Description 1",
      dueDate: "2024-03-31",
      priority: "P1",
    },
    {
      title: "Task 2",
      description: "Description 2",
      dueDate: "2024-04-15",
      priority: "P3",
    },
    {
      title: "Task 3",
      description: "Description 3",
      dueDate: "2024-04-15",
      priority: "P2",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [user, setUser] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState({ field: "", ascending: true });

  const handleSort = (field) => {
    setUsers((prevUsers) => {
      const sortedUsers = [...prevUsers].sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return aValue.localeCompare(bValue);
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        } else {
          return aValue.toString().localeCompare(bValue.toString());
        }
      });

      if (!sortOrder.ascending) {
        sortedUsers.reverse();
      }

      return sortedUsers;
    });
  };

  const handleComplete = (index) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index] = { ...updatedUsers[index], completed: true };
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setIsEdit(true);
    setUser({ ...users[index] });
  };

  const handleDelete = (index, title) => {
    setCurrentIndex(index);
    setUser({ title });
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers.splice(currentIndex, 1);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });

    setShowModal(false);
  };

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  const saveData = () => {
    if (Object.keys(user).length > 0) {
      let updatedUsers;

      if (isEdit) {
        updatedUsers = [...users];
        updatedUsers[currentIndex] = { ...user };
      } else {
        updatedUsers = [...users, user];
      }

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setUsers(updatedUsers);
      setCurrentIndex(-1);
      setIsEdit(false);
      setUser({});
    }
  };

  return (
    <div className="container mt-5">
      <div className="container mt-5 text-center">
        <h3>ToDo App</h3>
      </div>
      <div className="row flex-row">
        <div className="col-md-12 col-lg-3 form-style mb-3">
          
          <Forms
            handleChange={handleChange}
            user={user}
            saveData={saveData}
          />
        </div>
        <div className="col-md-12 col-lg-7">
          <TaskList
            users={users}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            handleSort={handleSort}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
          />
        </div>
      </div>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default App;
