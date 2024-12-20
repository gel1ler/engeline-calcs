'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Product } from '../../globalTypes';

const SearchInput = ({ products }: { products: Product[] }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selected, setSelected] = useState(-1);
  const router = useRouter();

  const setProduct = (item: Product) => {
    setSearchTerm('')
    setSuggestions([])
    router.replace(`?product=${String(item.category) + item.id}`);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = products.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const moveTrigger = (code: string) => {

    code === 'ArrowDown' && setSelected(prev => Math.min(prev + 1, suggestions.length - 1))
    code === 'ArrowUp' && setSelected(prev => Math.max(prev - 1, -1))
  }

  return (
    <div
      className="relative"
      onKeyDown={e => {
        if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
          e.preventDefault();
          moveTrigger(e.code)
        }
        if (e.code === 'Enter') {
          setProduct(suggestions[selected]);
          setSelected(-1)
        }
      }}
    >
      <input
        type='text'
        className='w-full h-10 rounded-lg mx-2 border px-4'
        placeholder='Поиск...'
        value={searchTerm}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
          {suggestions.map((suggestion, key) => (
            <li
              key={suggestion.id}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer" ${selected === key ? " bg-gray-100" : null}`}
              onClick={() => setProduct(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;