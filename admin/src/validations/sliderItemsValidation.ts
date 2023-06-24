import * as Yup from 'yup';

export const SliderItemValidationSchema = Yup.object().shape({
    img: Yup.mixed().required("Bitte laden Sie ein Bild hoch").nullable(),
    title:Yup.string().required("Bitte geben Sie einen Titel ein"),
    alt:Yup.string().required("Bitte geben Sie einen Text ein der das Bild beschreibt"),
})