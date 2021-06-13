import { DetailedComplaint } from "../../models/detailedComplaint";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";
import { getToken } from "../login/token";

export const getDetailedComplaint = async (id: string): Promise<IApiResponse<DetailedComplaint>> => {

    let url = process.env.REACT_APP_BACKEND_URL + "official/complaint/"+id;
    type T = IApiResponse<DetailedComplaint>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken(),
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}