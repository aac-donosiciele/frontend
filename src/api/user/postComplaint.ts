import { Http2ServerResponse } from "node:http2";
import { CreateComplaint } from "../../models/createComplaint";
import { userComplaints } from "../apiUrls";
import { handleResponse, handleError, IApiResponse } from "../apiUtils";

export const postComplaint = async (complaint: CreateComplaint): Promise<IApiResponse<Http2ServerResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + userComplaints+"/";
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token zmienic',
        }),
        body: JSON.stringify(complaint)
    }).then<T>(handleResponse).catch<T>(handleError);
}