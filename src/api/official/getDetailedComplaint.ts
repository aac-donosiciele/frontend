import { DetailedComplaint } from "../../models/detailedComplaint";
import { officialDetailedComplaint } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

export const getDetailedComplaint = async (id: string): Promise<IApiResponse<DetailedComplaint>> => {

    let url = process.env.REACT_APP_BACKEND_URL + officialDetailedComplaint;
    type T = IApiResponse<DetailedComplaint>;
    return fetch(url, {
        method: "GET",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token zmienic',
        }),
    }).then<T>(handleResponse).catch<T>(handleError);
}