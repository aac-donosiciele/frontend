import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
    container: {
        marginTop: '1em',
        width: '100%',
        display: 'flex',
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

const OfficialPage = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <div className={classes.box}>
                    <Typography variant='h5' className={classes.subheader}>
                        All stations:
                    </Typography>
                </div>
                <div className={classes.boxWider}>
                <Typography variant='h5' className={classes.subheader}>
                        All malfunctions:
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default OfficialPage;