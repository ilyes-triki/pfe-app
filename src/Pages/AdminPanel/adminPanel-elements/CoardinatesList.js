import React from 'react';

const CoardinatesList = ({ items, setItems, data, boards }) => {
  const handleCheckboxChange = (id) => {
    const selectedIndex = items.indexOf(id);
    if (selectedIndex === -1) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((item) => item !== id));
    }
  };
  console.log('fromlist', boards);
  return (
    <div className="coardinates-list">
      <ul>
        {data.map((item) => (
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
