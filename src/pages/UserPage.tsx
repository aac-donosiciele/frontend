import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Complaint from '../models/complaint';
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

const UserPage = () => {
    const classes = useStyles();
    const [sentComplaints, setSentComplaints] = useState<Complaint[]>([]);
    return (
        <>
            <div className={classes.container}>
                <div>
                    <Button color="primary" size="large">
                        
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