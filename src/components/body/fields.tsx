import React, { useEffect, useRef, useState } from 'react'
import Modal from './modal'
import { ConstsType } from '../../../globalTypes'
import Table from './table'
import { formatNumber } from '@/services'
import Input from './input'
import ExcelJS from 'exceljs';

const Fields = ({ units, name, data }: { units: string, name: string, data: any[] }) => {
    const [opened, setOpened] = useState(false)

    //Default consts
    const [scrapRate, setScrapRate] = useState(0.05);
    const [weight, setWeight] = useState(7850);

    //Prices
    const [price, setPrice] = useState(45000);
    const [sellPrice, setSellPrice] = useState(84000)
    const [netProfit, setNetProfit] = useState(0)
    const [plan, setPlan] = useState(10)


    const [diam, setDiam] = useState<number | null>(1020)
    const [thickness, setThickness] = useState<number | null>(10)
    const [weldingMaterialsCost, setWeldingMaterialsCost] = useState(1000);
    const [mainWorkersSalary, setMainWorkersSalary] = useState(3000);
    const [overheads, setOverheads] = useState(10000);
    const [electricityCost, setElectricityCost] = useState(600);
    const [rentCost, setRentCost] = useState(500);
    const [scrap, setScrap] = useState<boolean>(true)
    const [subOperations, setSubOperations] = useState<number>()
    const [genContractorInterest, setGenContractorInterest] = useState<number>()
    const [genContractorNDS, setGenContractorNDS] = useState<boolean>(false)

    const states: any = {
        mainWorkersSalary, setMainWorkersSalary,
        overheads, setOverheads,
        electricityCost, setElectricityCost,
        rentCost, setRentCost,
        subOperations, setSubOperations,
        genContractorInterest, setGenContractorInterest
    }

    useEffect(() => {
        switch (name) {
            case 'Трубы обечаечные':
                states.weldingMaterialsCost = weldingMaterialsCost;
                states.setWeldingMaterialsCost = setWeldingMaterialsCost;
                setScrap(true)
                setDiam(1020)
                setThickness(10)
                setGenContractorInterest(undefined)
                setSubOperations(undefined)
                break;
            case 'Муфты ремнонтные':
                setScrap(false)
                setDiam(null)
                setThickness(null)
                setGenContractorInterest(0)
                setSubOperations(0)
                break;
        }
    }, [name])

    const tableRef = useRef<HTMLTableElement>(null)

    const consts: ConstsType[] = [
        {
            id: 0,
            name: 'Масса стали',
            value: weight,
            setValue: setWeight,
            units: 'кг/м3'
        },
        {
            id: 1,
            name: 'Металлолом',
            value: scrapRate,
            setValue: setScrapRate,
            units: '%'
        }
    ]

    const extractTableData = () => {
        const table = tableRef.current;
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        const data: any = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = [
                Number(cells[0].textContent?.trim()),
                cells[1].textContent?.trim(),
                cells[2].querySelector('input')?.value.trim() || cells[2].textContent?.trim(),
            ];
            data.push(rowData);
        });

        return data;
    }

    const exportToExcel = () => {
        const data = extractTableData();

        const resData = [
            [`Сделка на ${plan + ' ' + units + ' ' + name} ${diam}x${thickness}`],
            [''],
            [''],
            ['Вводные данные'],
            ['', `Основные материалы (за ${units})`, price, '', `План (${units})`, plan],
            ['', `Цена продажи (за ${units})`, sellPrice, '', 'Итого оборот:', sellPrice * plan],
            ['', 'Диаметр', diam, '', 'Чистая прибыль:', netProfit * plan],
            ['', 'Толщина', thickness, '', 'Рентабельность:', Math.round((netProfit / sellPrice) * 100) + '%'],
            [''],
            ['Расчет'],
            ['№', "Наименование", `Стоимость за ${units}`],
            ...data
        ];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        resData.forEach((row, rowIndex) => {
            row.forEach((cell: any, cellIndex: number) => {
                worksheet.getCell(rowIndex + 1, cellIndex + 1).value = cell;
            });

        });

        worksheet.columns = [
            { width: 4.88 },
            { width: 38.38 },
            { width: 23 },
            { width: 23 },
            { width: 26 },
            { width: 18 },
        ];

        worksheet.mergeCells('A1:C2');
        worksheet.mergeCells('A4:C4');
        worksheet.mergeCells('A10:C10');

        const cell1 = worksheet.getCell('A1');
        cell1.alignment = {
            horizontal: 'center',
            vertical: 'middle'
        };
        cell1.font = {
            size: 18,
        };

        const cell2 = worksheet.getCell('A4');
        cell2.font = {
            bold: true
        };
        cell2.alignment = {
            horizontal: 'center',
        };

        const cell3 = worksheet.getCell('A10');
        cell3.font = {
            bold: true
        };
        cell3.alignment = {
            horizontal: 'center',
        };

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'данные.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    return (
        <div className='flex flex-col gap-4 mt-4 h-full'>
            <div className="flex gap-4">
                {diam === null ? null : <Input placeholder='Диаметр, мм' value={diam} setValue={setDiam} />}
                {thickness === null ? null : <Input placeholder='Толщина, мм' value={thickness} setValue={setThickness} />}
            </div>
            <div className="flex gap-4">
                <Input formated placeholder={`Цена закупки материалов, ₽/${units}`} value={price} setValue={setPrice} />
                <Input formated placeholder={`Цена продажи, ₽/${units}`} value={sellPrice} setValue={setSellPrice} />
            </div>
            <div className="flex gap-6">
                <div className="flex gap-2 items-center">
                    <p className='text-lg'>Отходы</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={scrap}
                            onChange={e => setScrap(!scrap)}
                        />
                        <span className="slider round" />
                    </label>
                </div>

                <div className="flex gap-2 items-center">
                    <p className='text-lg'>Суб. подрядные операции</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={subOperations !== undefined}
                            onChange={e => setSubOperations(subOperations === undefined ? 0 : undefined)}
                        />
                        <span className="slider round" />
                    </label>
                </div>

                <div className="flex gap-2 items-center">
                    <p className='text-lg'>Генподрядные</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={genContractorInterest !== undefined}
                            onChange={e => setGenContractorInterest(genContractorInterest === undefined ? 0 : undefined)}
                        />
                        <span className="slider round" />
                    </label>
                </div>

                {genContractorInterest !== undefined ?
                    <div className="flex gap-2 items-center">
                        <p className='text-lg'>НДС на генподрядные</p>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={genContractorNDS}
                                onChange={e => setGenContractorNDS(!genContractorNDS)}
                            />
                            <span className="slider round" />
                        </label>
                    </div>
                    : null
                }
            </div>
            <div className="xl:flex gap-10">
                <Table
                    tableRef={tableRef}
                    materialCost={price}
                    scrapRate={scrapRate}
                    sellPrice={sellPrice}
                    netProfit={netProfit}
                    setNetProfit={setNetProfit}
                    states={states}
                    genContractorNDS={genContractorNDS}
                    units={units}
                    scrap={scrap}
                />

                <div>
                    <table className='max-w-sm h-min mt-4 xl:mt-16'>
                        <tbody>
                            <tr>
                                <td>План ({units})</td>
                                <td className='relative'>
                                    <input
                                        type="number"
                                        style={{ all: 'unset' }}
                                        value={plan}
                                        onChange={e => setPlan(Number(e.target.value))}
                                    />
                                    <p className='absolute top-1 right-4 text-gray-500 '>✎</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Итого оборот</td>
                                <td>
                                    {formatNumber(plan * sellPrice)} ₽
                                </td>
                            </tr>
                            <tr>
                                <td>Чистая прибыль</td>
                                <td>
                                    {formatNumber(plan * netProfit)} ₽
                                </td>
                            </tr>
                            <tr>
                                <td>Рентабельность</td>
                                <td>
                                    {Math.round((netProfit / sellPrice) * 100)}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='mt-4 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg' onClick={exportToExcel}>
                        Экспорт в excel
                    </button>
                </div>
            </div>

            <div className="mt-auto shadowed p-4 w-fit rounded-lg">
                <div className='flex items-center gap-2'>
                    <h4 className='text-xl'>Константы: </h4>
                    <span
                        className='text-blue-500 text-lg cursor-pointer'
                        onClick={() => setOpened(true)}
                    >
                        изменить
                    </span>
                    <Modal
                        opened={opened}
                        onClose={() => setOpened(false)}
                        consts={consts}
                    />
                </div>
                {consts.map(item =>
                    <h6 key={item.id}>{item.name}: <b>{
                        item.units === `₽/${units}` ? formatNumber(item.value)
                            :
                            item.value * (item.units === '%' ? 100 : 1)
                    } {item.units}</b></h6>
                )}

            </div>
        </div>
    )
}

export default Fields