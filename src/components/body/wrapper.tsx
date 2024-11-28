'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import products from "@/../data/products.json";
import Fields from './fields';

const Wrapper = () => {
    const router = useSearchParams()
    const pid = router.get('product')
    console.log(pid)
    const seleted = products.find(i => String(i.category) + i.id === pid)

    return (
        <div className="flex flex-col flex-grow relative mt-4 p-5">
            {pid ? (
                <>
                    <h2 className="text-4xl font-bold">
                        {seleted?.name}
                    </h2>
                    <Fields />
                </>
            ) : (
                <h1 className="text-4xl font-bold opacity-25 text-center absolute left-0 right-0 mx-auto top-1/2 -translate-y-1/2">
                    Выберите категорию
                </h1>
            )}
        </div>
    )
}

export default Wrapper