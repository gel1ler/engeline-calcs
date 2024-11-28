import React from 'react'
import { NumericFormat } from 'react-number-format';

const Input = ({
    placeholder, formated, value, setValue
}: {
    placeholder: string, formated?: boolean, value: any, setValue: (val: any) => void
}) => {
    return (
        <div className='w-full'>
            <NumericFormat
                thousandSeparator={formated ? " " : ''}
                allowNegative={false}
                value={value}
                onValueChange={values => {
                    setValue(Number(values.value))
                }}
                placeholder={placeholder}
                className='w-full px-4 py-2 rounded-md focus:outline-none border'
            />
            {value ? <span className='text-gray-300 w-fit'>{placeholder}</span> : null}
        </div>
    );
};

export default Input