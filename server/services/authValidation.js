import {validationResult} from "express-validator";

const authValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            error: {
                code: 400,
                errors: errors
                    .array()
                    .map((error) => error.msg)
                    .toString()
                    .replace(",", ". ")
            }
        });
        return false;
    }
    return true;
};

export default authValidation;