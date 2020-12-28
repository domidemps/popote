import {createMuiTheme} from '@material-ui/core/styles'
import {darken, lighten, fade} from '@material-ui/core'

export const LIGHT_YELLOW = '#eaf8bf'
export const MEDIUM_YELLOW = '#e7eb90'
export const INTENSE_YELLOW = '#eca400'
export const MEDIUM_PURPLE = '#7f055f'
export const DARK_PURPLE = '#45062e'
export const WHITE = '#ffffff'
export const ERROR = '#f44336'

const rawBaseTheme = {
  palette: {
    background: {
      paper: fade(LIGHT_YELLOW, 0.6),
    },
    primary: {
      main: MEDIUM_PURPLE,
      contrastText: WHITE,
    },
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: MEDIUM_PURPLE,
        '&:hover': {
          backgroundColor: lighten(MEDIUM_PURPLE, 0.2),
        },
        borderRadius: 20,
        fontSize: 16,
      },
    },
    MuiFormControl: {
      root: {
        marginRight: 10,
      },
    },
  },
}

export default createMuiTheme(rawBaseTheme)
