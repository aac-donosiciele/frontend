import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const MainPage = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.container}>
                <div>
                    <Typography variant='h5' className={classes.subheader}>
                        Sended complaints:
                    </Typography>
                    <Typography variant='h5' className={classes.subheader}>
                        Available stations:
                    </Typography>
                </div>
            </div>
        </>
    )
}

export default MainPage;