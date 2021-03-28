"use strict";
exports.__esModule = true;
function Validation(input_element) {
    var type = input_element.type;
    var value = input_element.value;
    //check for password confirmation
    if (input_element.type === "password" && input_element.name === "") {
        input_element.dataset.message = "Passwords don't match";
        var original_password_element = document.getElementById('password');
        var original_password_1 = original_password_element.value;
        input_element.pattern = original_password_1;
        if (input_element.value === original_password_1) {
            original_password_element.addEventListener("keyup", function () {
                if (original_password_1 != value) {
                    return Validation(input_element);
                }
            });
            return true;
        }
        else {
            return false;
        }
    }
    var ValidationRequirements = {
        "text": {
            regExp_value: "^[A-Za-z]{2,10}$",
            message: "Text must include letters and be from 2 to 10 characters long"
        },
        "password": {
            regExp_value: "(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*",
            message: "Password must contains a digit, uppercase and lowercase letter, any character and be at least 6 characters long"
        },
        "email": {
            regExp_value: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message: "Email must contains @ and be from 2 to 15 characters long"
        },
        "tel": {
            regExp_value: "^[0-9]{5,13}$",
            message: "Telephone must contains a digit and be from 5 to 13 characters long"
        }
    };
    input_element.pattern = ValidationRequirements[type].regExp_value;
    input_element.dataset.message = ValidationRequirements[type].message;
    var res = new RegExp(ValidationRequirements[type].regExp_value);
    return res.test(value);
}
exports["default"] = Validation;
