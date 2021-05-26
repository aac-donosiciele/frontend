import Complaint from "../../models/complaint";
import { officialComplaints } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export const getOfficialComplaints = async (officialId: string): Promise<IApiResponse<Complaint[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + officialComplaints+officialId;
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