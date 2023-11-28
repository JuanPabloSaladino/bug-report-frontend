import dayjs from 'dayjs'
import * as Yup from 'yup'

export const AltaModificacionValidations = () => Yup.object({
    title:
        Yup
            .string()
            .required('Ingrese título'),
    description:
        Yup
            .string()
            .required('Ingrese descripción'),
    createdAt:
        Yup
            .date()
            .max(dayjs().add(1, 'day').toDate(), 'La fecha de creación debe ser como máximo la de hoy')
            .required('Ingrese una fecha de creación')
            .typeError('Ingrese una fecha válida')
})
