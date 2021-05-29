import { Http2ServerResponse } from "node:http2";
import { CreateComplaint } from "../../models/createComplaint";
import { complaints, user } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const postComplaint = async (complaint: CreateComplaint): Promise<IApiResponse<Http2ServerResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + user+complaints;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
        body: JSON.stringify(complaint)
    }).then<T>(handleResponse).catch<T>(handleError);
}