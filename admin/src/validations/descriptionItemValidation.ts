import * as YUP from 'yup';

export const DescriptionItemSchema = YUP.object().shape({
    title: YUP.string().required("Bitte geben Sie einen Titel ein"),
    text: YUP.string().required("Bitte geben Sie einen Text ein"),
});