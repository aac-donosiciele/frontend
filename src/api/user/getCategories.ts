import { Category } from "../../models/category";
import { categories } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getCategories = async (): Promise<IApiResponse<Category[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + categories;
    type T = IApiResponse<Category[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}