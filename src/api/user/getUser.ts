import User from "../../models/user";
import { user } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getUser = async (): Promise<IApiResponse<User>> => {

    let url = process.env.REACT_APP_BACKEND_URL + user;
    type T = IApiResponse<User>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}