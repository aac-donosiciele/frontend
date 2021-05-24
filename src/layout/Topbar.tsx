import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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




const Topbar = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <AppBar>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" display={"inline"} >
                        <Link to={"/"} className={classes.logo} >
                            Bikes
                        </Link>
                    </Typography>
                </Toolbar>
                 <OfficialsTabs />

            </AppBar>
            <Toolbar />
            <OfficialsTabs />

        </div>
    )
}

export default Topbar;