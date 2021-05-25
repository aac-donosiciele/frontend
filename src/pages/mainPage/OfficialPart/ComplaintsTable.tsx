import {
    Box,
    Button,
    Collapse,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Complaint from "../../../models/complaint";
import ComplaintTableChild from "./ComplaintTableChild";


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

export interface ComplaintsTableProps {
    compaints: Complaint[];
    setComplaints: (value: React.SetStateAction<Complaint[]>) => void;
}

const ComplaintsTable = (props: ComplaintsTableProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState<boolean[]>([]);
    const handleDelete = (id: string) => {

    };

    const handleBlock = (id: string) => {

    };

    const handleUnblock = (id: string) => {

    };
    const handleClickOpen = (index: number) => {

        setOpen( prev => {
            let tmp = [...prev];
            tmp[index] = !tmp[index];
            return tmp;
        });
    };
    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell align="left">Id</TableCell>
                    <TableCell align="right">Target</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Send date</TableCell>
                    <TableCell align="center" colSpan={2}>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.compaints.map((complaint, index) => {
                    return (<React.Fragment>
                    <TableRow key={complaint.Id}>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => handleClickOpen(index)}>
                                {open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            {complaint.Id}
                        </TableCell>
                        <TableCell align="right">
                            {complaint.TargetFirstName+ " "+complaint.TargetLastName}
                        </TableCell>
                        <TableCell align="right">
                            {complaint.Status}
                        </TableCell>
                        <TableCell align="right">
                            {complaint.SendDate}
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                            {complaint.Status === "active" ?
                                <div>
                                <Button className={classes.blockButton} onClick={() => handleBlock(complaint.Id)}>
                                                                        Accept
                                </Button>
                                <Button className={classes.unblockButton} onClick={() => handleUnblock(complaint.Id)}>
                                    Deny
                                </Button>
                                </div>
                                :
                                <Button className={classes.unblockButton} onClick={() => handleUnblock(complaint.Id)}>
                                    Mark as finished
                                </Button>}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                <Box margin={1} className={classes.child}>
                                    <ComplaintTableChild complaintId={complaint.Id} />
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                    </React.Fragment>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>
};

export default ComplaintsTable;
