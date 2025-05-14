import { Dispatch, SetStateAction } from "react";

export interface TProduct {
    id: number;
    name: string;
    category: number;
}

export interface Category {
    id: number;
    title: string;
}

export type ConstsType = {
    id: number;
    name: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    units: string;
}

export type tableType = {
    id?: number;
    name: string;
    cost: number;
    setCost?: (value: number) => void;
    NDS?: boolean;
    bold?: boolean
}

export interface CalculationStates {
    mainWorkersSalary?: number,
    overheads?: number,
    electricityCost?: number,
    rentCost?: number,
    subOperations?: number,
    genContractorInterest?: number,
    weldingMaterialsCost?: number
}

export interface CalculationSetters {
    setMainWorkersSalary?: Dispatch<SetStateAction<number>>,
    setOverheads?: Dispatch<SetStateAction<number>>,
    setElectricityCost?: Dispatch<SetStateAction<number>>,
    setRentCost?: Dispatch<SetStateAction<number>>,
    setSubOperations?: Dispatch<SetStateAction<number|undefined>>,
    setGenContractorInterest?: Dispatch<SetStateAction<number|undefined>>,
    setWeldingMaterialsCost?: Dispatch<SetStateAction<number>>,
};