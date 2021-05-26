import { Http2ServerResponse } from "node:http2";
import { officialComplaintUpdate } from "../apiUrls";
import { handleError, handleResponse, IApiResponse } from "../apiUtils";

const postOfficialComplaint = async (complaintId: string, officialId: string, status: Number): Promise<IApiResponse<Http2ServerResponse>> => {

    let url = process.env.REACT_APP_BACKEND_URL + officialComplaintUpdate;
    type T = IApiResponse<Http2ServerResponse>;
    return fetch(url, {
        method: "POST",
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'token zmienic',
        }),
        body: JSON.stringify({
            officialId: officialId,
            complaintId: complaintId,
            status: status
        })
    }).then<T>(handleResponse).catch<T>(handleError);
}

export const acceptComplaint = async (complaintId: string, officialId: string) => postOfficialComplaint(complaintId, officialId, 4);
export const denyComplaint = async (complaintId: string, officialId: string) => postOfficialComplaint(complaintId, officialId, 3);
export const finishedComplaint = async (complaintId: string, officialId: string) => postOfficialComplaint(complaintId, officialId, 5);