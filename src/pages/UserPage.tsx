import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getComplaints } from '../api/user/getComplaints';
import Complaint from '../models/complaint';
import User from '../models/user';
import ComplaintTable, { Transition } from './mainPage/UserPart/ComplaintsList';
import CreateComplaint from './mainPage/UserPart/CreateComplaint';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        padding: '1em',
        margin: '1em',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        margin: '1em',
    },
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});
export interface UserProps {
    id: string,
    user: User
}

const UserPage = (props: UserProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [sentComplaints, setSentComplaints] = useState<Complaint[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        getComplaints(props.id).then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get all malfunctions", { variant: "error" });
          } else {
            setSentComplaints(res.data || []);
          }
        });
      }, [enqueueSnackbar, props.id]);  

      return (
        <>
            <div className={classes.container}>
                <div>
                    <Button color="primary" size="large" onClick={() => setOpen(prev => !prev)}>
                        Send Complaint
                    </Button>
                    <Typography variant='h5' className={classes.subheader}>
                        Sent complaints:
                    </Typography>
                    <ComplaintTable setComplaints={setSentComplaints} complaints={sentComplaints}/>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={()=> setOpen(prev => !prev)}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">{"Create new Complaint"}</DialogTitle>
                        <DialogContent>
                            <CreateComplaint id={props.id} user={props.user}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default UserPage;