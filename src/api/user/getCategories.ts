import { Category } from "../../models/category";
import { categories } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export const getCategories = async (): Promise<IApiResponse<Category[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + categories;
    type T = IApiResponse<Category[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token zmienic',
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}