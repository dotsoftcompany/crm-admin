import { useState } from 'react';

export function useCharacterLimit({ maxLength }) {
  const [value, setValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const limit = maxLength;

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Enforce the character limit
    if (inputValue.length <= limit) {
      setValue(inputValue);
      setCharacterCount(inputValue.length);
    }
  };

  return { value, characterCount, handleChange, maxLength: limit };
}
