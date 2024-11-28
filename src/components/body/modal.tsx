import React, { useState } from 'react';
import { ConstsType } from '../../../globalTypes';

const Modal = ({
    opened, onClose, consts
}: {
    opened: boolean, onClose: (val: boolean) => void, consts: ConstsType[]
}) => {
    const [updatedConsts, setUpdatedConsts] = useState<ConstsType[]>(consts);

    const handleInputChange = (id: number, value: number) => {
        const updatedValue = updatedConsts.find(constItem => constItem.id === id)?.units === '%' ? value / 100 : value;

        setUpdatedConsts(prevConsts =>
            prevConsts.map(constItem =>
                constItem.id === id ? { ...constItem, value: updatedValue } : constItem
            )
        );
    };

    const handleSave = () => {
        updatedConsts.forEach(constItem => {
            constItem.setValue(constItem.value);
        });
        onClose(false);
    };

    if (!opened) return null;

    return (
        <div
            className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-center justify-center'
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSave();
                }
            }}
        >
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-xl font-bold mb-4'>Изменить константы</h2>
                {updatedConsts.map(constItem => (
                    <div key={constItem.id} className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            {constItem.name} ({constItem.units})
                        </label>
                        <input
                            type='number'
                            value={constItem.value * (constItem.units === '%' ? 100 : 1)}
                            onChange={(e) => handleInputChange(constItem.id, parseFloat(e.target.value))}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>
                ))}
                <div className='flex justify-end'>
                    <button
                        onClick={handleSave}
                        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                    >
                        Сохранить
                    </button>
                    <button
                        onClick={() => onClose(false)}
                        className='ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'
                    >
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;