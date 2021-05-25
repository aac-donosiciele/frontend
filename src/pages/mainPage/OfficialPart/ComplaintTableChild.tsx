import {
    createStyles,
    makeStyles,
    Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { getDetailedComplaint } from "../../../api/official/getDetailedComplaint";
import { DetailedComplaint } from "../../../models/detailedComplaint";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            display: "flex",
            width: "100%",
            justify: "center",
            alignItems: "center",
        },
        table: {
            minWidth: 700,
        },
        blockButton: {
            color: "#ee6002"
        },
        unblockButton: {
            color: "#09af00"
        },
        inlineHeader: {
            display: "flex",
            justifyContent:"space-between"
        },
        information: {
            display: "flex",
            justifyContent:"space-evenly"
        }
    })
);

export interface ComplaintTableChildProps {
    complaintId: string
}

const ComplaintTableChild = (props: ComplaintTableChildProps) => {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const [detailedComplaint, setDetailedComplaint ] = useState<DetailedComplaint>();
    useEffect(() => {
        getDetailedComplaint(props.complaintId).then((response) => {
            if (response.isError) {
                enqueueSnackbar("Could not get station datails", {variant: "error"});
            } else {
                setDetailedComplaint(response.data);
            }
        });
    }, [enqueueSnackbar, props.complaintId]);

    return (<React.Fragment>
        <div className={classes.inlineHeader}>
            <Typography variant="h6" gutterBottom>
            Complaint details:
            </Typography>
        </div>
        <div className={classes.information}>
            <div>Category: {detailedComplaint?.Category}</div>
            <div>Note: {detailedComplaint?.Note}</div>
        </div>
        <div>
            <Typography variant="subtitle1" gutterBottom>
            Complaint history:
            </Typography>
        </div>
    </React.Fragment>);
};

export default ComplaintTableChild;
