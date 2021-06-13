import { Users } from "../../models/users";
import { official } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getUsers = async (): Promise<IApiResponse<Users[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + 'users';
    type T = IApiResponse<Users[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}