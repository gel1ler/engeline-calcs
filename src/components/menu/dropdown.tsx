'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Dropdown = ({ title, items, categoryId }: { title: string, items: any[], categoryId: number }) => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const setProduct = (item: any) => {
    router.replace(`?product=${item}`)
  }

  return (
    <div className='pb-2'>
      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={() => setOpen(!open)}
      >
        <h4>{title}</h4>
        <button className={`dropdown-btn ${open ? 'opened' : ''}`}>+</button>
      </div>
      <div className={`dropdown ${open ? 'opened mt-2' : ''}`}>
        {items.map(item =>
          <h5
            key={item.id}
            className='cursor-pointer hover:translate-x-2 transition-transform duration-200'
            onClick={() => setProduct(String(categoryId) + item.id)}
          >
            - {item.name}
          </h5>
        )}
      </div>
    </div>
  )
}

export default Dropdown