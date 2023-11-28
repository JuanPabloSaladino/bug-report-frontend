import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import BugReportIcon from '@mui/icons-material/BugReport'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TextField } from '@mui/material'
import { Form, FormikConfig, FormikProvider, useFormik } from 'formik'
import { IFormInitialValues, Props } from './alta-modificacion-bug'
import { initialValues, style } from './AltaModificacionBug.constants'
import { IBug } from '../../types'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const AltaModificacionBug: React.FC<Props> = ({
                                                       handleCloseDialog,
                                                       handleSubmit,
                                                       initialFormValues,
                                                       openDialog,
                                                       title,
                                                       selectedIdRow
                                                     }) => {

  const formikProps: FormikConfig<IFormInitialValues> = {
    enableReinitialize: true,
    initialValues: { ...initialValues, ...initialFormValues },
    onSubmit: async (values: IFormInitialValues) => {
      handleSubmitData(values)
      handleCloseDialog()
    }
  }

  const formik = useFormik(formikProps)

  const handleSubmitData = (bug: IBug) => {
    handleSubmit(bug)
  }

  const handleToggleFix = () => {
    const newFixedValue = !formik.values.fixed
    const newClosedAtValue = newFixedValue ? dayjs() : null
  
    formik.setValues({
      ...formik.values,
      fixed: newFixedValue,
      closedAt: newClosedAtValue,
    })
  }

  return (
      <>
        <Dialog
            fullWidth={ true }
            maxWidth="sm"
            open={ openDialog }
            onClose={ () => {
              formik.resetForm()
              handleCloseDialog()
            } }
        >
          <DialogTitle sx={ style }>{ title } 🐛</DialogTitle>
          <FormikProvider value={ formik }>
            <Form noValidate>
              <DialogContent sx={ style }>
                <TextField
                    autoComplete="off"
                    fullWidth
                    label="Título"
                    name="title"
                    margin="none"
                    variant="outlined"
                    onChange={ formik.handleChange }
                    value={ formik.values.title }
                />
                <TextField
                    fullWidth
                    label="Descripción"
                    name="description"
                    margin="dense"
                    multiline
                    rows={ 2 }
                    variant="outlined"
                    onChange={ formik.handleChange }
                    value={ formik.values.description }
                />

                {
                  !!selectedIdRow &&
                  <LocalizationProvider dateAdapter={ AdapterDayjs }>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        label="Fecha de creación"
                        onChange={(date) => {
                          formik.setFieldValue('createdAt', date);
                        }}
                        sx={{ width: '100%' }}
                        value={ dayjs(formik.values.createdAt) }
                        />
                    </DemoContainer>
                  </LocalizationProvider>
                }
                
                {
                  !!selectedIdRow &&
                    <Button
                      name="fixed"
                      color={ formik.values.fixed ? 'error' : 'success' }
                      size="small"
                      sx={ { marginTop: '1em', width: '100%' } }
                      variant="contained"
                      onClick={() => handleToggleFix()}
                    >
                      {
                        formik.values.fixed
                            ? <BugReportIcon color="inherit" fontSize="small"/>
                            : <CheckCircleIcon color="inherit" fontSize="small"/>
                      }
                    </Button>
                }
              </DialogContent>
              <DialogActions sx={ style }>
                <Button
                    color="inherit"
                    onClick={ handleCloseDialog }
                    size="small"
                    variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                    color="success"
                    size="small"
                    type="submit"
                    variant="contained"
                >
                  Guardar
                </Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>
      </>
  )
}