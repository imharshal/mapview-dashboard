import React, { useEffect, useState } from "react";
import MapCard from "./../components/card/MapCard";
import { useNavigate } from "react-router-dom";
import apiService from "../services/apiService";
function Homepage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const cards1 = [
    {
      id: 1,
      title: "First Card",
    },
    {
      id: 2,
      title: "Second Card",
    },
    {
      id: 3,
      title: "Third Card",
    },
    {
      id: 4,
      title: "Forth Card",
    },
  ];
  useEffect(() => {
    apiService.getMapCards().then(({ data }) => setCards(data.data));
  }, []);
  return (
    <div className="main-panel">
      <h1 className="text-color ml-2">Map Cards</h1>
      <div className="grid p-2">
        {cards.map((c) => (
          <MapCard
            key={c.id}
            id={c.id}
            onClick={() => navigate(`/mapview/${c.id}`)}
          >
            {c.title}
          </MapCard>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
