import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Switch
} from "react-router-dom";
import { getRole, getToken, getUserName, setRole, setToken, setUserName } from "./api/login/token";
import { getUser } from "./api/user/getUser";
import RoleRoute from "./layout/RoleRoute";
import Topbar from "./layout/Topbar";
import { AppUser } from "./models/appUser";
import User from "./models/user";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AuthorityAdminPage from "./pages/mainPage/AuthorityAdminPage/AuthorityAdminPage";
import OfficialPage from "./pages/mainPage/OfficialPart/OfficialPage";
import RegisterPage from "./pages/RegisterPage";

const Pages = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [userM, setUserM] = useState<User>()

    const [user, setUser] = useState<AppUser | undefined>({
        token: getToken(),
        userName: getUserName(),
        role: getRole(),
    });
    useEffect(() => {
        const token = getToken();
        const userName = getUserName();
        const role = getRole();
        if (token && userName && role) {
            setUser({
                role,
                token,
                userName,
            })
        }
        else {
            setUser(undefined);
        }

    }, [])

    useEffect(() => {
        setToken(user?.token);
        setUserName(user?.userName);
        setRole(user?.role);
    }, [user])

    useEffect(() => {
        getUser().then((res) => {
          if (res.isError) {
            enqueueSnackbar("Could not get user", { variant: "error" });
          } else {
            setUserM(res.data);
          }
        });
      }, [enqueueSnackbar, user]); 

    return (
        <BrowserRouter>
            <Topbar setUser={setUser} user={user}/>
            <Switch>
                <RoleRoute exact path="/register" component={() => <RegisterPage />} />
                <RoleRoute exact path="/login" component={() => <LoginPage setUser={setUser} />} />
                <RoleRoute requiredRole={'user'} actualRole={user?.role} exact path="/" component={() => <MainPage user={userM}/>} />
                <RoleRoute requiredRole={'official'} actualRole={user?.role} exact path="/official" component={() => <OfficialPage user={userM}/>} />
                <RoleRoute requiredRole={'admin'} actualRole={user?.role} exact path="/admin" component={() => <AuthorityAdminPage user={userM}/>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;