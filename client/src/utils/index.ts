export const getFormDataEntriesAsObject = (formData: FormData): { [k: string]: any } | null => {
    if (!formData) {
        return null;
    }

    return [...formData.entries()].reduce((result: { [k: string]: any }, [k, v]) => (result[k] = v, result), {});
};