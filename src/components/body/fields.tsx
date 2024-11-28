import React, { useState } from 'react'
import Modal from './modal'

const Input = ({
    placeholder, type, value, setValue
}: {
    placeholder: string, type: string, value: any, setValue: (val: any) => void
}) => {
    return (
        <div className='w-full'>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                type={type}
                aria-label={placeholder}
                placeholder={placeholder}
                className='w-full px-4 py-2 rounded-md focus:outline-none border'
            />
            {value ? <span className='text-gray-300 w-fit'>{placeholder}</span> : null}
        </div>
    )
}

const Fields = () => {
    const [opened, setOpened] = useState(false)

    const [diam, setDiam] = useState()
    const [thickness, setThickness] = useState()
    const [length, setLength] = useState()

    const weight = 7850
    const price = 45000
    const scrap = 0.05

    const calculateWeight = () => {
        if (diam && thickness && length) {
            const D = diam / 1000 // Преобразуем диаметр в метры
            const t = thickness / 1000 // Преобразуем толщину в метры
            const L = length // Преобразуем длину в метры
            const M = Math.PI * (D - t) * t * L * weight / 1000
            return M.toFixed(4) // Округляем до двух знаков после запятой
        }
        return '0'
    }

    const formatNumber = (num: number) => {
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const resWeight = Number(calculateWeight())
    const resPrice = formatNumber(Number(resWeight * price * (1 + scrap)))

    return (
        <div className='flex flex-col gap-4 mt-4 h-full'>
            <div className="flex gap-4">
                <Input type='number' placeholder='Диаметр, мм' value={diam} setValue={setDiam} />
                <Input type='number' placeholder='Толщина, мм' value={thickness} setValue={setThickness} />
                <Input type='number' placeholder='Длина, м' value={length} setValue={setLength} />
            </div>
            <h4>Вес трубы: {resWeight} тн</h4>
            <h4>Вес металла для изготовления: {(resWeight * (1 + scrap)).toFixed(4)} тн</h4>
            <h4>Стоимость металла: {resPrice} руб</h4>

            <div className="mt-auto shadowed p-4 w-fit rounded-lg">
                <div className='flex items-center gap-2'>
                    <h4 className='text-xl'>Константы: </h4>
                    <span
                        className='text-blue-500 text-lg cursor-pointer'
                        onClick={() => setOpened(true)}
                    >
                        изменить
                    </span>
                    <Modal opened={opened} onClose={() => setOpened(false)} />
                </div>
                <h6>Масса стали: {weight} кг/м3</h6>
                <h6>Стоимость тонны: {formatNumber(price)} руб</h6>
            </div>
        </div>
    )
}

export default Fields