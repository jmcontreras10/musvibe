import { emailR, passR, birthdateR } from "../helpers/regex";

export const validateAuthInputs = (email: string, password: string) => {
    if (!emailR.test(String(email).toLowerCase())) throw new Error("Error: Invalid email format!");
    else if (!passR.test(password)) throw new Error("Error: Invalid password format. The password shoud have a lower case letter, an upper case letter and one og this symbols: ('! @ # ? ]')!");
}

export const validateUserInputs = (name: string, gender: string, birthdate: string) => {
    if(!name) throw new Error("Please insert your name to register!");

    if (gender){
        if (gender !== 'M' || 'F') throw new Error("Error: You entered a wrong gender format, should be: ('M','F', undefined)!");
    } 

    if (birthdateR){
        if(!birthdateR.test(birthdate)) throw new Error("Error: You entered a wrong birthdate format, should be: [yyyy/mm/dd]");
    } 
}