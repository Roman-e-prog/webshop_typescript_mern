import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Bitte geben Sie Ihren Benutzernamen ein"),
    email:Yup.string().email("Bitte geben Sie eine korrekte E-Mail Adresse ein").required("Die E-mail Adresse ist eine Pflichteingabe"),
    password: Yup.string().min(6, "Passwort erfordert mindestens sechs Zeichen").required("Das Passwort muss eingegeben werden")
})