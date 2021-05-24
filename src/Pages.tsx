import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";
import Topbar from "./layout/Topbar";
import MainPage from "./pages/mainPage/MainPage";
import OfficialPage from "./pages/mainPage/OfficialPart/OfficialPage";

const Pages = () => {

    return (
        <BrowserRouter>            
            <Topbar />
            <Switch>
                <Route exact path="/" component={() => <MainPage />} />
                <Route exact path="/official" component={() => <OfficialPage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Pages;