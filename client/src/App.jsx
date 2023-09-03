import {useRoutes} from "react-router-dom";
import routes from "./routes";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

function App() {
    const {userInfo} = useSelector((state) => state.auth);
    const [userRole, setUserRole] = useState();
    useEffect(() => {
        setUserRole(userInfo?.user.role || undefined);
    }, [userInfo]);

    const elements = useRoutes(routes(userRole));
    return <>{elements}</>;
}

export default App;
