import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    vorname: Yup.string().required("Bitte geben Sie Ihren Vornamen ein"),
    nachname: Yup.string().required("Bitte geben Sie Ihren Nachnamen ein"),
    email:Yup.string().email("Bitte geben Sie eine korrekte E-Mail Adresse ein").required("Die E-mail Adresse ist eine Pflichteingabe"),
    street: Yup.string().required("Bitte geben Sie Ihre Wohnstraße ein"),
    number: Yup.string().required("Bitte geben Sie Ihre Hausnummer ein"),
    plz: Yup.string().required("Bitte geben Sie Ihre Postleitzahl ein"),
    city: Yup.string().required("Bitte geben Sie Ihren Wohnort ein"),
    username: Yup.string().required("Bitte geben Sie Ihren Benutzernamen ein"),
    password: Yup.string().min(6, "Passwort erfordert mindestens sechs Zeichen").required("Das Passwort muss eingegeben werden"),
})