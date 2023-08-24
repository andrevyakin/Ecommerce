import Icon from "./common/icon";

const Footer = () => (
    <footer className="bg-dark py-3">
        <div className="d-flex align-items-center">
            <div className="container text-center">
                <span className="text-white-50">
                    &copy; Все права защищены.
                </span>
            </div>
            <div className="d-flex justify-content-end">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Icon
                        id="instagram"
                        addClassName="mx-3"
                        color="RGBA(var(--bs-secondary-rgb)"
                        size={16}
                    />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <Icon
                        id="facebook"
                        addClassName="mx-3"
                        color="RGBA(var(--bs-secondary-rgb)"
                        size={16}
                    />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <Icon
                        id="youtube"
                        addClassName="mx-3"
                        color="RGBA(var(--bs-secondary-rgb)"
                        size={16}
                    />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;
