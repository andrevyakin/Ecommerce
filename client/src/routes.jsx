import {Admin, Cart, Shop, Login, Registration, Product} from "./pages";
import {
    ADMIN_ROUTE,
    CART_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    CATEGORY_ROUTE,
    PRODUCT_ROUTE, PRODUCT_EDIT_ROUTE, PRODUCT_ROUTE_SINGLE
} from "./utils/consts";
import Profile from "./pages/auth/profile";
import EditProduct from "./components/admin/editProduct";

const router = (userRole) => [
    {
        //index: true,
        path: SHOP_ROUTE,
        element: <Shop/>
    },
    {
        path: PRODUCT_ROUTE,
        element: <Shop/>,
        children: [
            {
                path: ":id",
                element: (userRole === "user" || userRole === "admin") ? <Product/> : <Shop/>
            }
        ]
    },
    {
        path: PRODUCT_ROUTE_SINGLE,
        element: <Product/>,
        children: [
            {
                path: ":id",
                element: (userRole === "user" || userRole === "admin") ? <Product/> : <Shop/>
            }
        ]
    },
    {
        path: PRODUCT_EDIT_ROUTE,
        children: [
            {
                path: ":id",
                element: userRole === "admin" ? <EditProduct/> : <Shop/>
            }
        ]
    },
    {
        path: CATEGORY_ROUTE,
        children: [
            {
                path: ":id",
                element: <Shop/>
            }
        ]
    },
    {
        path: LOGIN_ROUTE,
        element: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration/>
    },
    {
        path: PROFILE_ROUTE,
        element: (userRole === "user" || userRole === "admin") ? <Profile/> : <Shop/>
    },
    {
        path: ADMIN_ROUTE,
        element: userRole === "admin" ? <Admin/> : <Shop/>,
        children: [
            {
                path: ":id",
                element: userRole === "admin" ? <EditProduct/> : <Shop/>
            }
        ]
    },
    {
        path: CART_ROUTE,
        element: (userRole === "user" || userRole === "admin") ? <Cart/> : <Shop/>,
        children: [
            {
                path: ":id",
                element: (userRole === "user" || userRole === "admin") ? <Cart/> : <Shop/>
            }
        ]
    }
    /*{
        path: "*",
        element: <Navigate to={SHOP_ROUTE} />
    }*/
];

export default router;
