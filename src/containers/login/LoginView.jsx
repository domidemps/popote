/** @jsx jsx */
import {jsx, css} from '@emotion/core'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

const styles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  .loginCanvas {
    width: 40%;
    align-self: center;
    min-height: 120px;
    padding-bottom: 40px;
    border-radius: 12px;
  }
  .title {
    margin: 20px 0;
  }
  .flexCanvas {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .fullwidth: {
    width: 100%;
  }
  .textField {
    padding-bottom: 15px;
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
      <Paper elevation={7} className="login loginCanvas">
        <Typography variant="h4" align="center" className="title">
          Popote
        </Typography>
        <FormControl>
          <InputLabel htmlFor="login-username">Username</InputLabel>
          <Input id="login-username" aria-describedby="my-helper-text" />
        </FormControl>
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
