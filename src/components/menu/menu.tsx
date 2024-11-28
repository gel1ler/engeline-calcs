import React from 'react'
import Dropdown from './dropdown'
import { Category, Product } from '../../../globalTypes';

const Menu = ({ products, categories }: { products: Product[], categories: Category[] }) => {
    const groupedProducts = products.reduce((acc: { [key: number]: { id: number, title: string, items: Product[] } }, product) => {
        if (!acc[product.category]) {
            acc[product.category] = {
                id: product.category,
                title: categories[product.category - 1]?.title,
                items: []
            };
        }
        acc[product.category].items.push(product);
        return acc;
    }, {});

    // Преобразуем объект в массив
    const arr = Object.values(groupedProducts);

    return (
        <div className='flex flex-col gap-3 menu'>
            <h3>Меню</h3>
            {arr.map((item, key) => (
                <div key={item.id} >
                    <Dropdown title={item.title} items={item.items} categoryId={item.id} />
                    {key === arr.length - 1 ? null : <hr />}
                </div>
            ))}
        </div>
    )
}

export default Menu