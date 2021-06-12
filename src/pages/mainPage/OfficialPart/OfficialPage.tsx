import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getOfficialComplaints } from '../../../api/official/getOfficialComplaints';
import Complaint from '../../../models/complaint';
import { PropsUser } from '../../../Pages';
import ComplaintsTable from './ComplaintsTable';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    box: {
        width: 'inherit',
        maxWidth: '450px'
    },
    boxWider: {
        width: 'inherit',
        maxWidth: '800px'
    },
    subheader: {
        padding: '0.25em',
        paddingLeft: '0.5em',
    },
});

const OfficialPage = (props: PropsUser) => {
    const classes = useStyles();
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        getOfficialComplaints(props?.user.id).then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get all complaints", { variant: "error" });
          } else {
            setComplaints(res.data || []);
          }
        });
      }, [enqueueSnackbar, props.user]);  
    return (
        <>
            <div className={classes.container}>
                <div className={classes.box}>
                    <Typography variant='h5' className={classes.subheader}>
                        Complaint table:
                    </Typography>
                </div>
                <ComplaintsTable id={props?.user.id} compaints={complaints} setComplaints={setComplaints}/>
            </div>
        </>
    )
}

export default OfficialPage;