import {
    createStyles,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { ComplaintLog } from "../../../models/complaintLog";


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
        child: {
            maxWidth: "100%"
        }
    })
);

export interface ComplaintHistoryTableProps {
    complaints: ComplaintLog[];
}
const sortLambda = (a: ComplaintLog, b:ComplaintLog) => {
        if (a.UpdateDate < b.UpdateDate) return -1;
        if (a.UpdateDate > b.UpdateDate) return 1;
        return 0;
}
const ComplaintHistoryTable = (props: ComplaintHistoryTableProps) => {
    const classes = useStyles();
    const [logs, setLogs] = useState<ComplaintLog[]>([]);
    useEffect(() => {
        setLogs( props.complaints.sort(sortLambda));
    }, [props.complaints]);
    return <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">UpdateDate</TableCell>
                        <TableCell align="right">Official Id</TableCell>
                        <TableCell align="right">Official Name</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map(log => {
                        return (<React.Fragment>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {log.UpdateDate}
                                </TableCell>
                                <TableCell align="right">
                                    {log.OfficialId}
                                </TableCell>
                                <TableCell align="right">
                                    {log.OffiacialName}
                                </TableCell>
                                <TableCell align="right">
                                    {log.Status}
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
};

export default ComplaintHistoryTable;
