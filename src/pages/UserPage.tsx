import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getComplaints } from '../api/user/getComplaints';
import Complaint from '../models/complaint';
import User from '../models/user';
import ComplaintTable from './mainPage/UserPart/ComplaintsList';

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
                    <Button color="primary" size="large">
                        Send Complaint
                    </Button>
                    <Typography variant='h5' className={classes.subheader}>
                        Sent complaints:
                    </Typography>
                    <ComplaintTable setComplaints={setSentComplaints} complaints={sentComplaints}/>

                </div>
            </div>
        </>
    )
}

export default UserPage;