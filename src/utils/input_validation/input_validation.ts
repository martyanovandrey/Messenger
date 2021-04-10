export default function Validation(input_element: HTMLInputElement): boolean {
    const { type } = input_element;
    const { value } = input_element;

    // check for password confirmation
    if (input_element.type === 'password' && input_element.name === '') {
        input_element.dataset.message = "Passwords don't match";
        const original_password_element = <HTMLInputElement>document.getElementById('password');
        const original_password: string = original_password_element.value;
        input_element.pattern = original_password;
        if (input_element.value === original_password) {
            original_password_element.addEventListener('keyup', () => {
                if (original_password != value) {
                    return Validation(input_element);
                }
            });
            return true;
        }
        return false;
    }

    interface Item {
        regExp_value: string;
        message: string;
    }

    interface Validation {
        [key: string]: Item;
    }

    const ValidationRequirements:Validation = {
        text: {
            regExp_value: '^[A-Za-z]{2,10}$',
            message: 'Text must include letters and be from 2 to 10 characters long',
        },
        password: {
            regExp_value: '(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*',
            message: 'Password must contains a digit, uppercase and lowercase letter, any character and be at least 6 characters long',
        },
        email: {
            regExp_value: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
            message: 'Email must contains @ and be from 2 to 15 characters long',
        },
        tel: {
            regExp_value: '^[0-9]{5,13}$',
            message: 'Telephone must contains a digit and be from 5 to 13 characters long',
        },

    };

    input_element.pattern = ValidationRequirements[type].regExp_value;
    input_element.dataset.message = ValidationRequirements[type].message;
    const res = new RegExp(ValidationRequirements[type].regExp_value);
    return res.test(value);
}
