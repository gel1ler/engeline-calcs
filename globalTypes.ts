export interface Product {
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