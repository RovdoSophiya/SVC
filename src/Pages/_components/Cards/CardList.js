import React, { useState } from "react";
import Card from "./Card";
import "./card.css";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: "", description: "" });

  const handleAddCard = () => {
    const newId = Date.now();
    setCards([...cards, { id: newId, ...newCard }]);
    setNewCard({ title: "", description: "" });
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEditCard = (id) => {
    const cardToEdit = cards.find((card) => card.id === id);
    setNewCard(cardToEdit);
    handleDeleteCard(id);
  };

  const handleSelectCard = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleDeleteSelected = () => {
    setCards(cards.filter((card) => !selectedCards.includes(card.id)));
    setSelectedCards([]);
  };

  return (
    <div className="container">
      <h2 className="reviewsLogo">Reviews</h2>
      <div class="form">
        <div className="Input">
          <input
            type="text"
            placeholder="Title"
            value={newCard.title}
            onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newCard.description}
            onChange={(e) =>
              setNewCard({ ...newCard, description: e.target.value })
            }
          />
        </div>
        <div className="Buttons">
          <button onClick={handleAddCard}>Add Card</button>
          <button
            onClick={handleDeleteSelected}
            disabled={selectedCards.length === 0}
          >
            Delete Selected
          </button>
        </div>
      </div>
      <div className="card-list">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
            isSelected={selectedCards.includes(card.id)}
            onSelect={() => handleSelectCard(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
