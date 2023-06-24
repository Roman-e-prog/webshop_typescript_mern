import * as Yup from 'yup';

export const NewsletterFormSchema = Yup.object().shape({
    vorname: Yup.string().required("Bitte geben Sie Ihren Vornamen ein"),
    nachname: Yup.string().required("Bitte geben Sie Ihren Nachnamen ein"),
    email:Yup.string().email("Bitte geben Sie eine korrekte E-Mail Adresse ein").required("Die E-mail Adresse ist eine Pflichteingabe"),
    radiodata: Yup.string().required("Bitte wählen Sie ein Interessengebiet"),
})