import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../api/user/getUser';
import { useSnackbar } from "notistack";
import User from '../models/user';
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
    const [user, setUser] = useState<User>()
    const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        getUser().then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get user", { variant: "error" });
          } else {
            setUser(res.data);
          }
        });
      }, [enqueueSnackbar]);  
    return (
        <>
            <div className={classes.container}>
                <UserPage user={user}/>
            </div>
        </>
    )
}

export default MainPage;

