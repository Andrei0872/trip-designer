export type TypeOfFirstArg<F extends (...args: any[]) => any> = Parameters<F>[0];

export interface ExportData {
    exportData: () => any;
}