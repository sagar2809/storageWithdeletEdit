import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, clearItem, editItem }) => {
  console.log(items);
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;

        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit></FaEdit>
              </button>
              <button className="delete-btn" onClick={() => clearItem(id)}>
                <FaTrash></FaTrash>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
