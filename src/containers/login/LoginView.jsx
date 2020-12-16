/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import MailIcon from '@material-ui/icons/Mail'
import LockIcon from '@material-ui/icons/Lock'

import PopoteLogo from '../../images/popote_logo.png'
import {DARK_PURPLE, INTENSE_YELLOW, MEDIUM_PURPLE} from '../../styles/material_ui_raw_theme_file'
import {darken} from '@material-ui/core'

const styles = css`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
  background: linear-gradient(${darken(MEDIUM_PURPLE, 0.3)}, ${INTENSE_YELLOW});
  .loginPaper {
    width: 60%;
    align-self: center;
    min-height: 120px;
    padding: 20px 0px;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .title {
    margin: 20px 0;
    font-weight: 500;
    color: ${DARK_PURPLE};
  }
  .flexColumn {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .maxSize {
    flex-grow: 1;
    width: inherit;
  }
  .logo {
    width: 60%;
  }
  .flexRow {
    display: flex;
    flex-direction: row;
  }
  .icon {
    margin: 20px 15px 5px 5px;
    fill: ${DARK_PURPLE};
  }
  .fullwidth: {
    width: 100%;
  }
  .textField {
    padding-bottom: 15px;
  }
  .button {
    margin: 30px;
  }
`

export default function LoginView() {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.user.authenticated)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (authenticated) {
      dispatch(push('/'))
    }
  }, [authenticated])

  return (
    <div css={styles}>
      <Paper elevation={7} className="loginPaper flexRow">
        <div className="flexColumn">
          <img src={PopoteLogo} alt="Popote" className="logo" />
          <Typography variant="h5" align="center" className="title">
            Toutes mes recettes, au même endroit.
          </Typography>
        </div>
        <div className="flexColumn maxSize">
          <Typography variant="h4" align="center" className="title">
            Se connecter
          </Typography>
          <div className="flexRow">
            <MailIcon className="icon" />
            <FormControl>
              <InputLabel htmlFor="login-email">E-mail</InputLabel>
              <Input id="login-email" type="email" />
            </FormControl>
          </div>
          <div className="flexRow">
            <LockIcon className="icon" />
            <FormControl>
              <InputLabel htmlFor="login-password">Mot de passe</InputLabel>
              <Input id="login-password" type="password" />
            </FormControl>
          </div>
          <Button variant="contained" color="primary" className="button">
            C'est parti !
          </Button>
        </div>
      </Paper>
    </div>
  )
}

// export default function LoginView() {
//   const dispatch = useDispatch()
//   const authenticated = useSelector(state => state.user.authenticated)
//   const {getFieldProps, handleSubmit} = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     onSubmit(values) {
//       // This will return when the form is submitted
//     },
//   })
//
//   // TODO: To remove
//   // on ComponentDidMount:
//   // if (authenticated) {
//   //   dispatch(push('/')
//   // }
//   // on ComponentWillReceiveProps
//   // if (nextAuthenticated && !authenticated {
//   //    dispatch(push('/')
//   // }
//
//   useEffect(() => {
//     if (authenticated) {
//       dispatch(push('/'))
//     }
//   }, [authenticated])
//
//   return (
//     <div css={styles}>
//       <Paper elevation={7} className="login loginCanvas">
//         <Typography variant="h4" align="center" className="title">
//           Popote
//         </Typography>
//         <form className="baseForm" onSubmit={handleSubmit} noValidate>
//           <input
//             type="email"
//             name="E-mail"
//             id="email"
//             className="email formField"
//             {...getFieldProps('email')}
//           />
//           <input
//             type="password"
//             name="Password"
//             id="current-password"
//             className="password formField"
//             {...getFieldProps('password')}
//           />
//         </form>
//       </Paper>
//     </div>
//   )
// }
