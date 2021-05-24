import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, Zoom
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Complaint from "../../../models/complaint";

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
      minWidth: 750,
    },
    blockButton: {
      color: "#ee6002"
    },
    unblockButton: {
        color: "#09af00"
    },
    widerCell:{
      minWidth: '4em'
    },
    widestCell:{
      minWidth: '15em'
    },
    addButton: {
      margin: theme.spacing(2),
    },
  })
);

export const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Zoom in ref={ref} {...props} />;
});


export interface ComplaintTableProps {
    setComplaints: (value: React.SetStateAction<Complaint[]>) => void;  
    complaints: Complaint[];
  }
  
  const ComplaintTable = (props: ComplaintTableProps) => {
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [cancel, setCancel] = useState<string>("");

    const clickCancel = (id: string) => {
        setCancel(id);
        setOpen(prev => !prev);
    }

    const cancelComplaint = (id: string) => {
        enqueueSnackbar("heheh");
    }

    return ( props.complaints.length > 0 ? 
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Malfunction</TableCell>
                    <TableCell align="right" className={classes.widerCell}>ID</TableCell>
                    <TableCell align="right" className={classes.widerCell}>Target</TableCell>
                    <TableCell align="right" className={classes.widestCell}>Note</TableCell>
                    <TableCell align="right" className={classes.widestCell}>Status</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.complaints.map((comp) => (
                    <TableRow key={comp.Id}>
                    <TableCell component="th" scope="row">
                        {comp.Id}
                    </TableCell>
                    <TableCell align="right">{comp.TargetFirstName + " " + comp.TargetLastName}</TableCell>
                    <TableCell align="right">
                        {comp.Note}
                    </TableCell>
                    <TableCell align="center">
                        {comp.Status}
                    </TableCell>
                    <TableCell align="right">
                        <Button className={classes.blockButton} disabled={comp.Status!=='pending'} onClick={()=>clickCancel(comp.Id)}>
                            Cancel
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            
            </TableContainer>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=> setOpen(prev => !prev)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Rent this bike?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Do you want to cancel complaint {cancel} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> setOpen(prev => !prev)} color="primary">
                        No
                    </Button>
                    <Button onClick={()=>cancelComplaint(cancel)} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        :
        <Typography variant="subtitle1" gutterBottom>No complaints send</Typography>
    );
  }
  
  export default ComplaintTable;