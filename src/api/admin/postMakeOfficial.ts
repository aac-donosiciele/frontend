import { Http2ServerResponse } from "node:http2";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

const postMakeOfficial = async (officialId: string): Promise<IApiResponse<Http2ServerResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + 'makeOfficial';
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify({
            id: officialId
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}

export default postMakeOfficial;