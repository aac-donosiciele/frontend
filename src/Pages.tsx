import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Topbar from "./layout/Topbar";
import MainPage from "./pages/mainPage/MainPage";

const Pages = () => {

    return (
        <BrowserRouter>            
            <Topbar />
            <Switch>
                <Route exact path="/" component={() => <MainPage />} />                
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;