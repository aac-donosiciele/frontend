import {
    Typography
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getDetailedComplaint } from "../../../api/official/getDetailedComplaint";
import { DetailedComplaint } from "../../../models/detailedComplaint";
import ComplaintHistoryTable from "./ComplaintHistoryTable";


export interface ComplaintTableChildProps {
    complaintId: string
}

const ComplaintTableChild = (props: ComplaintTableChildProps) => {
    const {enqueueSnackbar} = useSnackbar();
    const [detailedComplaint, setDetailedComplaint ] = useState<DetailedComplaint>();
    useEffect(() => {
        getDetailedComplaint(props.complaintId).then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get complaint datails", {variant: "error"});
            } else {
                setDetailedComplaint(response.data);
            }
        });
    }, [enqueueSnackbar, props.complaintId]);

    return (<React.Fragment>
        <div>
            <Typography variant="subtitle1" gutterBottom>
            Complaint history:
            </Typography>
            <ComplaintHistoryTable complaints={detailedComplaint?.history || []} />
        </div>
    </React.Fragment>);
};

export default ComplaintTableChild;
