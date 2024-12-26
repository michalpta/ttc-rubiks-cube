export function rotateCW(matrix: string[][]): string[][] {
    return matrix[0].map((_, index) => matrix.map(row => row[index]).reverse());
}

export function rotateCCW(matrix: string[][]): string[][] {
    return matrix[0].map((_, index) => matrix.map(row => row[row.length - 1 - index]));
}

export interface Dictionary<T> {
    [index: string]: T;
}
