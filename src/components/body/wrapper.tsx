'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import products from "@/../data/products.json";
import categories from "@/../data/categories.json";
import Fields from './fields';
import { TProduct } from '../../../globalTypes';

const Wrapper = () => {
    const searchParams = useSearchParams()
    const pid = searchParams.get('product')
    const selected: TProduct | undefined = products.find(i => String(i.category) + i.id === pid)

    if (!products || !categories) {
        return <div>Загрузка данных...</div>
    }

    return (
        <div className="flex flex-col flex-grow relative mt-4 p-5">
            {pid && selected ? (
                <>
                    <h2 className="text-4xl font-bold">
                        {selected.name}
                    </h2>
                    <Fields 
                        units={categories[selected.category]?.units || 'тн'} 
                        product={selected} 
                    />
                </>
            ) : (
                <h1 className="text-4xl font-bold opacity-25 text-center absolute left-0 right-0 mx-auto top-1/2 -translate-y-1/2">
                    Выберите продукт
                </h1>
            )}
        </div>
    )
}

export default Wrapper