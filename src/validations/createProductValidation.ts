import * as Yup from 'yup';

export const createProductSchema = Yup.object().shape({
    image:Yup.mixed().required("Bitte ein Bild hochladen").nullable(),
    title: Yup.string().required("Bitte geben Sie den Namen des Produktes ein"),
    producer: Yup.string().required("Bitte den Hersteller eingeben"),
    categories: Yup.array()
    .of(Yup.string()
    .matches(/([A-Za-z]+( [A-Za-z]+)+)/i, "Bitte die Kategorien ohne Komma eingeben. Erst die Hauptkategorie")
    )
    .min(1, "Bitte geben Sie eine ProduktKategorie ein, als erstes die Hauptkategorie(z.B Herren), dann nur mit Leerzeichen getrennt die Unterkategorie(z.B Sportschuhe)"),
    desc: Yup.string().required("Bitte geben Sie eine Produktbeschrebung ein")
    .required("Sie müssen eine Kategorie eingeben"),
    price: Yup.string().required("Bitte geben Sie den Preis ein"),
    currency: Yup.string().required("Bitte geben Sie die Währung ein, als €"),
    colors: Yup.array()
    .of(Yup.string()
    .matches(/([a-z]+( [a-z]+)+)/i, "Bitte die Farben ohne Komma eingeben. Farben bitte klein schreiben")
    )
    .min(1, "Bitte geben Sie die Farben nur durch Leerzeichen getrennt in englischer Sprache ein")
    .required("Sie müssen eine Farbe eingeben"),
    sizes: Yup.array()
    .of(Yup.string()
    .matches(/\s[0-9]+\s[0-9]+\s[0-9]+/, "Bitte die Größen ohne Komma eingeben. Am Anfang ein Leerzeichen.")
    )
    .min(1, "Bitte geben Sie die Größen nur durch Leerzeichen getrennt ein")
    .required("Sie müssen eine Größe eingeben"),
    inStock:Yup.boolean().default(true),
});