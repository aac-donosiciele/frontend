import { login as loginUrl } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export interface LoginResponse {
    token: string;
    role: string;
}
export const login = async (username: string, password: string): Promise<IApiResponse<LoginResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + loginUrl;
    type T = IApiResponse<LoginResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(
            {
                login: username,
                password: password,
            })
    }).then<T>(handleResponse).catch<T>(handleError);
}