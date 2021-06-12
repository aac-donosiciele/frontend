import { register as registerUrl } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export interface RegisterResponse {
    token: string;
}
export const register = async (username: string, password: string): Promise<IApiResponse<RegisterResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + registerUrl;
    type T = IApiResponse<RegisterResponse>;
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