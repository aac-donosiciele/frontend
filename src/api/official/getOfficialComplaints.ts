import Complaint from "../../models/complaint";
import { complaints, official } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getOfficialComplaints = async (officialId: string): Promise<IApiResponse<Complaint[]>> => {

    let url = process.env.REACT_APP_BACKEND_URL + official+officialId+'/'+complaints;
    type T = IApiResponse<Complaint[]>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}