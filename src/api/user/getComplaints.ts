import Complaint from "../../models/complaint";
import { userComplaints } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export const getComplaints = async (userId: string): Promise<IApiResponse<Complaint[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + userComplaints+"/"+userId;
    type T = IApiResponse<Complaint[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token zmienic',
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}