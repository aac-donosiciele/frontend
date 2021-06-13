import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../api/admin/getUsers';
import { Users } from '../../../models/users';
import { PropsUser } from '../../../Pages';
import UsersTable from './UsersTable';

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

const AuthorityAdminPage = (props: PropsUser) => {
    const classes = useStyles();
    const [users, setUsers] = useState<Users[]>([]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        if(props?.user.id === 'none')
            return;
        getUsers().then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get all users", { variant: "error" });
          } else {
            setUsers(res.data || []);
          }
        });
      }, [enqueueSnackbar, props.user]);  
    return (
        <>
            <div className={classes.container}>
                <UsersTable users={users} setUsers={setUsers} id={props.user.id}/>
            </div>
        </>
    )
}

export default AuthorityAdminPage;