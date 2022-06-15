export const getFormDataEntriesAsObject = (formData: FormData): { [k: string]: any } | null => {
    if (!formData) {
        return null;
    }

    return [...formData.entries()].reduce((result: { [k: string]: any }, [k, v]) => (result[k] = v, result), {});
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const computeNrDays = (startDate: string, endDate: string) => {
    const diffMilliseconds = new Date(endDate).getTime() - new Date(startDate).getTime();
    
    return diffMilliseconds / DAY_IN_MS;
}