export default function Validation(input_element: HTMLInputElement): boolean {
    let type:string = input_element.type;
    let value:string = input_element.value;

    //check for password confirmation
    if(input_element.type === "password" && input_element.name === ""){
        input_element.dataset.message = "Passwords don't match"
        let original_password_element: Element = document.getElementById('password')
        let original_password: string = original_password_element.value
        input_element.pattern = original_password;
        if(input_element.value === original_password){
            original_password_element.addEventListener("keyup", () => {
                if(original_password.value != value){
                    return Validation(input_element)
                }
            })
            return true
        } else {
            return false
        }
    }

    interface Validation {
        "text": object;
        "password": object;
        "email": object;
        "tel": object;
      }
    // password - String is > 5 chars, contains a digit, contains an uppercase letter, contains a lowercase letter, a character not being alphanumeric.
    const ValidationRequirements:Validation = {
        "text": {
            regExp_value: "^[A-Za-z]{2,10}$",
            message: `Text must include letters and be from 2 to 10 characters long`
        },
        "password": {
            regExp_value: "(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*",
            message: `Password must contains a digit, uppercase and lowercase letter, any character and be at least 6 characters long`
        },
        "email": {
            regExp_value: "^[\\w-\\.]+@[\w-]+\\.[a-z]{2,15}$",
            message: `Email must contains @ and be from 2 to 15 characters long`
        },
        "tel": {
            regExp_value: "^[0-9]{5,13}$",
            message: `Telephone must contains a digit and be from 5 to 13 characters long`
        }
        
    };

    input_element.pattern = ValidationRequirements[type].regExp_value;
    input_element.dataset.message = ValidationRequirements[type].message;
    let res: RegExp = new RegExp(ValidationRequirements[type].regExp_value);
    return res.test(value)

}
