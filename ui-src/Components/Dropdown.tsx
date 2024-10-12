import React, { useState } from 'react';

export default function Dropdown() {
  const [selectedOption, setSelectedOption] = useState(''); // State to store selected value

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Update state with selected value
  };

  return (
    <div>
      <label htmlFor="dropdown">Choose an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>

      <p>You selected: {selectedOption}</p>
    </div>
  );
}


