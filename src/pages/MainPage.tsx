import { makeStyles } from '@material-ui/core/styles';
import UserPage from './UserPage';

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
                <UserPage id={"test"} user={{Id:"test", IsVerified:false}}/>
            </div>
        </>
    )
}

export default MainPage;