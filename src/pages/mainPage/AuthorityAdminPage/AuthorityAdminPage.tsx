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

const AuthorityAdminPage = (props: any) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
            </div>
        </>
    )
}

export default AuthorityAdminPage;