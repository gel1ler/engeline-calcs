import React, { LegacyRef, useEffect } from 'react'
import { CalculationSetters, CalculationStates, tableType } from '../../../globalTypes';
import { formatNumber } from '@/services';
import { NumericFormat } from 'react-number-format';

type itemType = { id: number; name: string; cost: number; setCost?: (value: number) => void; NDS?: boolean; bold?: boolean; }

const EdditableCell = ({ item }: { item: itemType }) => {
    return (
        <td className=" break-words text-center relative">
            {item.setCost ? (
                <>
                    <NumericFormat
                        thousandSeparator=" "
                        allowNegative={false}
                        value={item.cost}
                        onValueChange={values => {
                            item.setCost!(Number(values.value))
                        }}
                        placeholder="Введите значение"
                        prefix="₽ "
                        className='mr-1 outline-none bg-transparent text-center'
                    />
                    <p className='absolute top-1 right-4 text-gray-500 '>✎</p>
                </>
            ) : (
                <div className='flex items-center justify-center'>
                    <span className='mr-1'>₽</span>{formatNumber(item.cost)}
                </div>
            )}
        </td>
    )
}

const Table = ({
    materialCost, scrapRate, sellPrice, setNetProfit, tableRef, states, setters, genContractorNDS, units, scrap
}: {
    materialCost: number,
    scrapRate: number,
    sellPrice: number,
    setNetProfit: (value: number) => void,
    tableRef: LegacyRef<HTMLTableElement> | undefined,
    states: CalculationStates,
    setters: CalculationSetters,
    genContractorNDS?: boolean,
    units: string,
    scrap?: boolean
}) => {

    // Table data
    const initTableData: (tableType | null)[] = [
        // Materials
        { name: 'Основные материалы:', cost: materialCost, NDS: true },
        states.weldingMaterialsCost !== undefined ? { name: 'Сварочные материалы:', cost: states.weldingMaterialsCost, setCost: setters.setWeldingMaterialsCost, NDS: true } : null,

        // Salary and salary taxes
        states.mainWorkersSalary !== undefined ? { name: 'Основная з/п рабочих', cost: states.mainWorkersSalary, setCost: setters.setMainWorkersSalary } : null,
        { name: 'Налоги на з/п рабочих', cost: Math.round(states.mainWorkersSalary ? states.mainWorkersSalary * 0.35 : 0) },
        { name: 'З/п ИТР', cost: Math.round(states.mainWorkersSalary ? states.mainWorkersSalary * 0.5 : 0) },
        { name: 'Налоги на з/п ИТР', cost: Math.round(states.mainWorkersSalary ? states.mainWorkersSalary * 0.5 * 0.35 : 0) },

        // Overheads
        states.subOperations !== undefined ? { name: 'Суб. подрядные операции', cost: states.subOperations, setCost: setters.setSubOperations, NDS: true } : null,
        states.overheads !== undefined ? { name: 'Накладные', cost: states.overheads, setCost: setters.setOverheads } : null,
        states.electricityCost !== undefined ? { name: 'Электроэнергия', cost: states.electricityCost, setCost: setters.setElectricityCost, NDS: true } : null,
        states.rentCost !== undefined ? { name: 'Аренда (обор. + цех)', cost: states.rentCost, setCost: setters.setRentCost, NDS: true } : null,
        states.genContractorInterest !== undefined ? { name: 'Генподрядные', cost: states.genContractorInterest, setCost: setters.setGenContractorInterest, NDS: genContractorNDS } : null,

        //
        scrap ? { name: 'Отходы (лом)', cost: materialCost * scrapRate, NDS: true } : null,
    ];

    const filteredTableData = initTableData.filter(item => item !== null) as tableType[];
    const tableData = filteredTableData.map((item, index) => ({
        ...item,
        id: index + 1
    }));


    //Taxes count
    const newId = tableData.length;
    const profitBeforeTaxes = sellPrice - tableData.reduce((sum, item) => sum + (item.cost || 0), 0);
    const ndsToPay = sellPrice * 0.2 / 1.2 - tableData.reduce((sum, item) => sum + (item.NDS ? item.cost : 0 || 0), 0) * 0.2 / 1.2;
    const profitTax = (profitBeforeTaxes - ndsToPay) * 0.2;
    const calculatedNetProfit = profitBeforeTaxes - profitTax - ndsToPay;
    useEffect(() => {
        setNetProfit(calculatedNetProfit);
    }, [calculatedNetProfit, setNetProfit]);
    tableData.push({ id: newId + 1, name: 'Прибыль до налогов', cost: profitBeforeTaxes, bold: true });
    tableData.push({ id: newId + 2, name: 'НДС к уплате', cost: ndsToPay });
    tableData.push({ id: newId + 3, name: 'Налог на прибыль', cost: profitTax });
    tableData.push({ id: newId + 4, name: 'Чистая прибыль', cost: calculatedNetProfit, bold: true });

    return (
        <div className="mt-4">
            <h3 className="text-2xl mb-4">Расчет</h3>
            <table className="w-full max-w-3xl" ref={tableRef}>
                <thead>
                    <tr>
                        <th>№</th>
                        <th className="text-left">Наименование</th>
                        <th>Стоимость за {units}</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={item.id} className={`${index % 2 == 0 ? 'bg-gray-100' : ''} ${item.bold ? 'font-bold' : ''}`}>
                            <td className="break-words text-center">{item.id}</td>
                            <td className='break-words'>{item.name + (item.NDS ? ' (с НДС)' : '')}</td>
                            <EdditableCell item={item} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Table