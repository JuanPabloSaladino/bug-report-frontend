import { useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import BugReportIcon from '@mui/icons-material/BugReport'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { FormControlLabel, FormGroup, Grid, Switch, TextField, Typography } from '@mui/material'
import { Form, FormikConfig, FormikProvider, useFormik } from 'formik'
import { IFormInitialValues, Props } from './alta-modificacion-bug'
import { initialValues, style } from './AltaModificacionBug.constants'
import { Stack, styled } from '@mui/system'
import { IBug } from '../../types'
import { BugAPI } from '../../api/bug-api'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${ encodeURIComponent(
            '#fff',
        ) }" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: '\'\'',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${ encodeURIComponent(
          '#fff',
      ) }" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

export const AltaModificacionBug: React.FC<Props> = ({
                                                       handleCloseDialog,
                                                       handleSubmit,
                                                       initialFormValues,
                                                       openDialog,
                                                       title,
                                                     }) => {

  const formikProps: FormikConfig<IFormInitialValues> = {
    enableReinitialize: true,
    initialValues: { ...initialValues, ...initialFormValues },
    onSubmit: async (values: IFormInitialValues) => {
      //TODO: Acá tengo que hacer el llamado a la API
      handleSubmitData(values)
      handleCloseDialog()
    }
  }

  const formik = useFormik(formikProps)

  const handleSubmitData = (bug: IBug) => {
    handleSubmit(bug)
  }

  const handleToggleFix = async (bugId: string) => {
    console.log('handleToggleFix ', bugId)

    const bugToUpdate = await BugAPI
                                .getBugById(bugId)

    if(bugToUpdate) {
        BugAPI
            .updateBug(bugId, bugToUpdate)
            .then((updatedBug) => console.log('bugActualizado',updatedBug))
    }


  }

  useEffect(() => {
    //if (initialFormValues.bugDTO !== undefined)
    //console.log('initialFormValues!: ', initialFormValues.bugDTO)
  }, [initialFormValues])

  useEffect(() => {
    //console.log(formik.values)
  }, [formik.values])

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

                {/*                <FormGroup>
                  <Stack direction="row" spacing={ 1 } alignItems="center">
                    <Typography>To Do</Typography>
                    <FormControlLabel
                        control={ <MaterialUISwitch sx={ { m: 1 } } defaultChecked/> }
                    />
                    <Typography>Fix</Typography>
                  </Stack>
                </FormGroup>*/ }

                {/*                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="baseline"
                    marginTop={ 1 }
                    spacing={ 3 }
                >*/ }
                {/*                  <Grid item marginTop={ 2 }>
                    <Typography sx={ { color: '#000' } }>
                      {
                        formik.values.fixed
                            ? 'Marcar bug como pendiente'
                            : 'Marcar bug como resuelto'
                      }
                    </Typography>
                  </Grid>*/ }
                {/*<Grid item>*/ }
                <Button
                    color={ formik.values.fixed ? 'error' : 'success' }
                    size="small"
                    sx={ { marginTop: '1em' } }
                    variant="contained"
                    onClick={ () => handleToggleFix(formik.values.id) }
                >
                  {
                    formik.values.fixed
                        ? <BugReportIcon color="inherit" fontSize="small"/>
                        : <CheckCircleIcon color="inherit" fontSize="small"/>
                  }
                </Button>
                {/*                  </Grid>
                </Grid>*/ }

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