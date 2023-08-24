import PropTypes from "prop-types";

const FormContainer = ({children}) => (
    <div className="container">
        <div className="row justify-content-md-center mt-5">
            <div className="col-sm-12 col-md-6 card p-5 bg-success-subtle">
                {children}
            </div>
        </div>
    </div>
);

FormContainer.propTypes = {
    children: PropTypes.node
};

export default FormContainer;
