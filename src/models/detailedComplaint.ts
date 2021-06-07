import Complaint from "./complaint";
import { ComplaintLog } from "./complaintLog";

export interface DetailedComplaint extends Complaint{
    history: ComplaintLog[]
}