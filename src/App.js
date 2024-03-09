import React, { useState } from "react";
import DeleteModal from "./components/DeleteModal";
import TaskList from "./components/TaskList";
import Forms from "./components/Forms";
import "./App.css";
import { useTodo } from './TodoContext';

const App = () => {
  const { lists, setLists } = useTodo();

  const [list, setList] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState({ field: "", ascending: true });

  const handleSort = (field) => {
    setLists((prevLists) => {
      const sortedLists = [...prevLists].sort((a, b) => {
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
        sortedLists.reverse();
      }
      return sortedLists;
    });
  };

  const handleComplete = (index) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists[index] = { ...updatedLists[index], completed: true };
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });
  };

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setIsEdit(true);
    setList({ ...lists[index] });
  };

  const handleDelete = (index, title) => {
    setCurrentIndex(index);
    setList({ title });
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      updatedLists.splice(currentIndex, 1);
      localStorage.setItem("lists", JSON.stringify(updatedLists));
      return updatedLists;
    });

    setShowModal(false);
  };

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    setList((prevList) => ({ ...prevList, [field]: value }));
  };

  const saveData = () => {
    if (Object.keys(list).length > 0) {
      let updatedLists;
      if (isEdit) {
        updatedLists = [...lists];
        updatedLists[currentIndex] = { ...list };
      } else {
        updatedLists = [...lists, list];
      }

      localStorage.setItem("lists", JSON.stringify(updatedLists));

      setLists(updatedLists);
      setCurrentIndex(-1);
      setIsEdit(false);
      setList({});
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
            list={list}
            saveData={saveData}
          />
        </div>
        <div className="col-md-12 col-lg-7">
          <TaskList
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
        list={list}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default App;
