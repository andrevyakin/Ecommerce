import {
    useGetProductsCountByCategoryQuery,
    useGetProductsCountQuery
} from "../../slices/endpoints/shopApiSlice";
import Loader from "../common/loader";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import useNavigateSearch from "../../hooks/useNavigateSearch";
import {PRODUCT_ROUTE} from "../../utils/consts";

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
    }, [search]);

    const {
        data: totalProducts,
        isLoading,
        isSuccess
    } = useGetProductsCountQuery();
    const {data: productByCategoryCount} = useGetProductsCountByCategoryQuery(
        isCategoryId,
        {skip: !isCategoryId}
    );

    if (isSuccess) {
        const pagesCount =
            Math.ceil(productByCategoryCount / productsOnPage) ||
            Math.ceil(totalProducts.result / productsOnPage);
        if (pagesCount === 1 || search.includes("regex")) return;

        return (
            <>
                {totalProducts.result && (
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
