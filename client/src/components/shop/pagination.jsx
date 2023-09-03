import Loader from "../common/loader";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useNavigateSearch from "../../hooks/useNavigateSearch";
import {PRODUCT_ROUTE, PRODUCT_URL, SHOP_ROUTE} from "../../utils/consts";
import {useGetProductQuery, useGetProductsCountByCategoryQuery} from "../../slices/endpoints/shopApiSlice";

const Pagination = () => {
    const {search} = useLocation();
    const [productsOnPage, setProductsOnPage] = useState(6);
    const [isCategoryId, setIsCategoryId] = useState("");
    const navigateSearch = useNavigateSearch();

    useEffect(() => {
        setProductsOnPage(
            search.includes("limit")
                ? Number(
                    search
                        .split("&")
                        .filter((i) => i.includes("limit"))
                        .toString()
                        .split("=")[1]
                )
                : 6
        );
        setIsCategoryId(
            search.includes("category")
                ? search
                    .split("&")
                    .filter((i) => i.includes("category"))
                    .toString()
                    .split("=")[1]
                : ""
        );
        if (search === SHOP_ROUTE) {
            setProductsOnPage(6);
        }
    }, [search]);

    const {
        data,
        isLoading,
        isSuccess
    } = useGetProductQuery(`${process.env.REACT_APP_API_URL}${PRODUCT_URL}?limit=Infinity`);
    const {data: productByCategoryCount} = useGetProductsCountByCategoryQuery(
        isCategoryId,
        {skip: !isCategoryId}
    );

    if (isSuccess) {
        const totalProducts = data.products.length;

        const pagesCount =
            Math.ceil(productByCategoryCount / productsOnPage) ||
            Math.ceil(totalProducts / productsOnPage);

        if (pagesCount === 1 || search.includes("regex")) return;

        return (
            <>
                {totalProducts && (
                    <nav>
                        <ul className="pagination justify-content-center">
                            {Array(pagesCount)
                                .fill("")
                                .map((_, i) => (
                                    <li key={i} className="page-item">
                                        <button
                                            className="page-link"
                                            id={`${i + 1}`}
                                            onClick={() =>
                                                navigateSearch(PRODUCT_ROUTE, {
                                                    page: i + 1
                                                })
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                )}
                {isLoading && <Loader />}
            </>
        );
    }
};

export default Pagination;
