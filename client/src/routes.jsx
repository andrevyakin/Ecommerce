import {Navigate} from "react-router-dom";
import {Admin, Cart, Shop, Login, Registration} from "./pages";
import {
    ADMIN_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    CATEGORY_ROUTE,
    PRODUCT_ROUTE
} from "./utils/consts";
import Profile from "./pages/auth/profile";

const router = (userRole) => [
    {
        //index: true,
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: PRODUCT_ROUTE,
        element: <Shop />
    },
    {
        path: CATEGORY_ROUTE,
        children: [
            /*{
                path: "",
                element: <Shop />
            },*/
            {
                path: ":id",
                element: <Shop />
            }
        ]
    },
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration />
    },
    {
        path: PROFILE_ROUTE,
        element: <Profile />
    },
    {
        path: ADMIN_ROUTE,
        element: userRole === "admin" ? <Admin /> : <Navigate to={SHOP_ROUTE} />
    },
    {
        path: CART_ROUTE,
        element: userRole ? <Cart /> : <Navigate to={SHOP_ROUTE} />
    }
    /*{
        path: "*",
        element: <Navigate to={SHOP_ROUTE} />
    }*/
];

export default router;
