import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getComplaints } from '../../../api/user/getComplaints';
import Complaint from '../../../models/complaint';
import { PropsUser } from '../../../Pages';
import ComplaintTable, { Transition } from './ComplaintsList';
import CreateComplaint from './CreateComplaint';

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


const UserPage = (props: PropsUser) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [sentComplaints, setSentComplaints] = useState<Complaint[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        getComplaints(props.user?.Id || "").then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get all complaints", { variant: "error" });
          } else {
            setSentComplaints(res.data || []);
          }
        });
      }, [enqueueSnackbar, props.user]);  

      return (
        <>
            <div className={classes.container}>
                <div>
                    <Button color="primary" 
                            size="large" 
                            onClick={() => setOpen(prev => !prev)}
                            disabled={!props.user?.IsVerified}>
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
                            <CreateComplaint user={props.user} setOpen={setOpen}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default UserPage;