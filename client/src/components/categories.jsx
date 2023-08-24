import Loader from "./common/loader";
import {useGetCategoriesQuery} from "../slices/endpoints/shopApiSlice";
import {PRODUCT_ROUTE} from "../utils/consts";
import {NavLink, useLocation} from "react-router-dom";

const Categories = () => {
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCategoriesQuery();

    const {search} = useLocation();

    let content;
    if (isLoading) {
        content = <Loader />;
    } else if (isSuccess) {
        content = (
            <aside className="col-3 p-2 bg-light d-none d-sm-block">
                <h1 className="text-center fw-bold lead">Категории</h1>
                <nav className="nav flex-column">
                    {categories.map(({_id: id, name}) => (
                        <NavLink
                            key={id}
                            to={{
                                pathname: PRODUCT_ROUTE,
                                search: `?category=${id}`
                            }}
                            className={() =>
                                `nav-link fw-bold h2 p-3 border border-primary-subtle rounded-3 ${
                                    search.includes(id)
                                        ? "text-dark-emphasis bg-danger-subtle"
                                        : "bg-success-subtle"
                                }`
                            }
                        >
                            {name}
                        </NavLink>
                    ))}
                </nav>
            </aside>
        );
    } else if (isError) {
        content = <div>{error.toString()}</div>;
    }

    return content;
};

export default Categories;
