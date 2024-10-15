import React from "react";

const Card = ({ card, onDelete, onEdit, isSelected, onSelect }) => {
  return (
    <div className={`card ${isSelected ? "selected" : ""}`} onClick={onSelect}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="card-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card.id);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
