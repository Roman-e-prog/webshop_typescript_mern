import * as Yup from 'yup';

 export const LoginSchema = Yup.object().shape({
    username:Yup.string().required("Bitte geben Sie Ihren usernamen ein"),
    email:Yup.string().email("Bitte geben Sie eine korrekte email-adresse an").required("Die Eingabe der E-mail ist Pflicht"),
    password:Yup.string().min(6, "Passwort erfordert mindestens sechs Zeichen").required("Das Passwort muss eingegeben werden")
});
