import React, { useContext } from 'react';
import { BoardContext } from '../BoardsProvider.js';

const CoardinatesList = ({ items, setItems }) => {
  const { firestoreBoards } = useContext(BoardContext);

  const handleCheckboxChange = (id) => {
    const selectedIndex = items.indexOf(id);

    if (selectedIndex === -1) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((item) => item !== id));
    }
  };

  return (
    <div className="coardinates-list">
      <ul>
        {firestoreBoards.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={items.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.id}: {item.alt}, {item.lan}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoardinatesList;
