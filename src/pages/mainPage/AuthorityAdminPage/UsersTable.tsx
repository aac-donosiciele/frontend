import {
    Box,
    Button,
    Collapse,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import postMakeOfficial from "../../../api/admin/postMakeOfficial";
import { RoleFromInt } from "../../../api/login/token";
import { Users } from "../../../models/users";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            display: "flex",
            width: "100%",
            justify: "center",
            alignItems: "center",
        },
        table: {
            minWidth: 700,
        },
        blockButton: {
            color: "#ee6002"
        },
        unblockButton: {
            color: "#09af00"
        },
        child: {
            maxWidth: "100%"
        }
    })
);

export interface UsersTableProps {
    id: string,
    users: Users[];
    setUsers: (value: React.SetStateAction<Users[]>) => void;
}

const UsersTable = (props: UsersTableProps) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const handleMake = (id: string) => {
        postMakeOfficial(id).then((res) => {
            if (res.isError) {
              enqueueSnackbar("Could make user an official", { variant: "error" });
            } else {
                if(res.responseCode===204)
                    props.setUsers(prev => {
                        let tmp = [...prev];
                        tmp = tmp.map(x => {
                            if(x.id===id)
                                x.role = 1;
                            return x;
                        })
                        return tmp;
                    });
            }
          });
    };

  
    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left">Id</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Role</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.users.map((user, index) => {
                    return (<React.Fragment>
                    <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                            {user.id}
                        </TableCell>
                        <TableCell align="right">
                            {user.username}
                        </TableCell>
                        <TableCell align="right">
                            {RoleFromInt(user.role)}
                        </TableCell>
                        <TableCell align="right" colSpan={2}>
                                <div>
                                    <Button className={classes.unblockButton} 
                                    onClick={() => handleMake(user.id)}
                                    disabled={user.role > 0}>
                                        Make official
                                    </Button>
                                </div>
                        </TableCell>
                    </TableRow>
                    </React.Fragment>
                    );
                })}
            </TableBody>
        </Table>
    </TableContainer>
};

export default UsersTable;
