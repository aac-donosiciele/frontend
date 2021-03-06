import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppUser } from "../models/appUser";
import AdminTabs from "../pages/mainPage/AdminTabs";
import OfficialsTabs from "../pages/mainPage/OfficialsTabs";

const useStyles = makeStyles(theme => ({
    toolbar: {
    },
    logo: { textDecoration: 'none', color: "white" },
    loginButton: {
        backgroundColor: "white",
        marginLeft: "auto",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        },
    },
    logoutButton: {
        backgroundColor: "white",
        marginLeft: "1em",
        '&:hover': {
            backgroundColor: "#DAE0E2"
        },
    },
    right: {
        marginLeft: "auto",
    }

}));

export interface TopbarProps {
    user?: AppUser;
    setUser: React.Dispatch<React.SetStateAction<AppUser | undefined>>;
}

const Topbar = (props: TopbarProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [userName, setUserName] = useState<string>();
    useEffect(() => {
        setUserName(props.user?.userName || '');
    }, [props.user])


    const handleLoginClick = () => {
        history.push("login");
    }

    const handleLogoutClick = () => {
        props.setUser(undefined);
        history.push("/login");
    }

    return (
        <div>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" display={"inline"} >
                        <Link to={"/"} className={classes.logo} >
                            Donos Online
                        </Link>
                    </Typography>
                    {props.user?.userName ?
                        <>
                            <Typography className={classes.right}>Witaj {userName}</Typography>
                            <Button className={classes.logoutButton} onClick={handleLogoutClick}>Log out</Button>
                        </>
                        :
                        <Button className={classes.loginButton} onClick={handleLoginClick}>Log in</Button>
                    }
                </Toolbar>
                {parseInt(props.user?.role || "-1") > 1 && <AdminTabs />}
                {parseInt(props.user?.role || "-1") === 1 && <OfficialsTabs />}

            </AppBar>
            <Toolbar />
            {parseInt(props.user?.role || "-1") > 1 && <AdminTabs />}
            {parseInt(props.user?.role || "-1") === 1 && <OfficialsTabs />}


        </div>
    )
}

export default Topbar;