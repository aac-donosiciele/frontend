
export interface IApiResponse<T> {
    isError: boolean;
    errorMessage?: string;
    responseCode: number;
    data?: T;
}

export const handleResponse = async <T>(response: Response): Promise<IApiResponse<T>> => {
    if (response.ok) {
        return {
            isError: false,
            responseCode: response.status,
            data: response.status!==204 ? await response.json() : null,
        }
    }
    else {
        return {
            isError: true,
            responseCode: response.status,
            errorMessage: await response.text(),
        }
    }
}


export const handleError = async <T>(error: any): Promise<IApiResponse<T>> => {
    return {
        isError: true,
        responseCode: error.status,
        errorMessage: error.message,
    }
}