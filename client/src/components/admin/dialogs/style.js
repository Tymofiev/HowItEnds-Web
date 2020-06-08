import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dropzone: {
    color: theme.palette.primary,
    backgroundColor: theme.palette.background.default,
    border: '1px solid white',
  },
  dropzoneText: {
    color: theme.palette.primary,
  },
}))

export default useStyles
