export function normalize(value: string | null | undefined): string {
    if (typeof value === 'string') {
        return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    return '';
}

export function zeroFill(value: number, size: number = 11): any {
    if(value){
        const inputString = value.toString();
        if (inputString.length > size) {
            throw new Error(`O número informado é maior que ${size}.`);
        }
        const zerosNeeded = 11 - inputString.length;
        const zeroString = '0'.repeat(zerosNeeded);
        return zeroString + inputString;
    } else {
        return value
    }
}
