export const formatNumber = (num: number) => {
    if (!num) {
        return 0;
    }
    return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

export const parseNumber = (str: string) => {
    return parseFloat(str.replace(/\s/g, ''));
};