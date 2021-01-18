/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import {push} from 'connected-react-router'
import {useDispatch, useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ConfirmedEmailImage from 'images/email_confirmed.png'
import ExpiredEmailImage from 'images/email_expired.png'
import {DARK_PURPLE} from 'styles/material_ui_raw_theme_file'
import media from 'styles/media'
import {checkEmailValidity} from 'actions/user'

const styles = css`
  display: flex;
  flex-direction: column;
  .validationPaper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
    align-self: center;
    min-height: 120px;
    padding: 20px 0px;
    border-radius: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .title {
    margin: 20px 5px;
    font-weight: 500;
    color: ${DARK_PURPLE};
  }
  .emailStatusImage {
    width: 50%;
  }
  .message {
    margin: 20px 10px;
    color: ${DARK_PURPLE};
  }
  .button {
    margin: 15px 0;
  }
  ${media.horizontalTablet`
    .validationPaper {
      width: 70%;
      min-width: 70%;
    }
    .title {
      font-size: 1.5rem;
    }
    .message {
      font-size: 1.25rem;
    }
    .emailStatusImage {
      width: 40%;
    }
  `}
  ${media.verticalTablet`
    .validationPaper {
      width: 80%;
    }
  `}
  ${media.smartphone`
    .validationPaper {
      width: 90%;
    }
    .title {
      font-size: 1.25rem;
    }
    .message {
      font-size: 1rem;
    }
  `}
`

export default function AccountValidationView() {
  const {token} = useParams()
  const dispatch = useDispatch()
  const [fetched, setFetched] = useState(false)
  const emailValidity = useSelector(state => state.user.emailValidity)

  // Mimics ComponentWillMount() from React life cycle
  useEffect(() => {
    // dispatch(checkEmailValidity(token))
    setFetched(true)
  }, [])

  if (!fetched) {
    return null
  }

  const goToLogin = () => {
    dispatch(push('/login'))
  }

  const goToSignIn = () => {
    dispatch(push('/sign-in'))
  }

  return (
    <div css={styles}>
      <Paper elevation={7} className="validationPaper">
        <Typography variant="h4" align="center" className="title">
          {emailValidity ? 'E-mail vérifié avec succès' : 'Oups !'}
        </Typography>
        <img
          src={emailValidity ? ConfirmedEmailImage : ExpiredEmailImage}
          alt="E-mail vérifié"
          className="emailStatusImage"
        />
        <Typography variant="h5" align="center" className="message">
          {emailValidity ? ' Bravo, ton compte a été validé !' : "Le lien de l'email a expiré..."}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="button"
          onClick={emailValidity ? () => goToLogin() : () => goToSignIn()}>
          {emailValidity ? 'Connexion' : 'Recréer le compte'}
        </Button>
      </Paper>
    </div>
  )
}
