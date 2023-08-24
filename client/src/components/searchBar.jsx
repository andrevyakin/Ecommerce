import Icon from "./common/icon";

const SearchBar = () => {
    console.log("Строка поиска");
    return (
        <form className="col">
            <Icon
                id="search"
                color="RGBA(var(--bs-secondary-rgb)"
                size={20}
            />
            <input
                type="search"
                name="search"
                placeholder="Поиск (по названию)"
                autoComplete="off"
            />
        </form>
    );
};

export default SearchBar;
