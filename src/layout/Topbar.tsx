import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const Topbar = () => {
    return (
        <div>
            <AppBar>
                <Toolbar>            
                    <Typography variant="h6">
                    Donos
                    </Typography>                
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </div>
    )
}

export default Topbar;