import {createSearchParams, useLocation, useNavigate} from "react-router-dom";

const useNavigateSearch = () => {
    const navigate = useNavigate();
    const {search: isExistedSearch} = useLocation();
    return (pathname, params) =>
        navigate({
            pathname,
            search:
                !isExistedSearch ||
                Object.keys(params)[0].includes("[gte]") ||
                Object.keys(params)[0].includes("regex]")
                    ? `?${createSearchParams(params)}`
                    : !isExistedSearch.includes(Object.keys(params)[0])
                        ? `${isExistedSearch}&${createSearchParams(params)}`
                        : `${
                            isExistedSearch
                                .split("?")[1]
                                .split("&")
                                .filter(
                                    (i) => !i.includes(Object.keys(params)[0])
                                )
                                .filter(
                                    (i) => !i.includes(Object.keys(params)[1])
                                ).length === 0
                        }`
                            ? `${isExistedSearch
                                .split("&")
                                .filter((i) => !i.includes(Object.keys(params)[0]))
                                .filter((i) => !i.includes(Object.keys(params)[1]))
                                .join("&")}&${createSearchParams(params)}`
                            : `${isExistedSearch
                                .split("&")
                                .filter((i) => !i.includes(Object.keys(params)[0]))
                                .filter((i) => !i.includes(Object.keys(params)[1]))
                                .join("&")}${createSearchParams(params)}`
        });
};

export default useNavigateSearch;
