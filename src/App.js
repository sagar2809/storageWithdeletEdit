import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    console.log(name);
    e.preventDefault();
    console.log("hello....");
    if (!name) {
      showAlert(true, "please enter the name", "danger");
      //setAlert({ show: true, msg: "please enter value", type: "danger" });
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "value changed", "success");

      //is editing
    } else {
      // shoe alert
      showAlert(true, "item added to the list", "success");
      console.log("hrro");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const clearList = () => {
    showAlert(true, "List is Empty", "danger");
    setList([]);
  };
  const clearItem = (id) => {
    console.log("clear itrm");
    showAlert(true, "item has been removed", "danger");
    const newItem = list.filter((item) => id !== item.id);
    setList(newItem);
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => id === item.id);
    console.log(specificItem);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
    showAlert(true, "item is editing", "danger");
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={list}></Alert>
        )}
        <h3>glocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} clearItem={clearItem} editItem={editItem}></List>
          <button className="clear-btn" onClick={() => clearList()}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
