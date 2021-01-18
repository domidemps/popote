/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useParams} from 'react-router'
import {push} from 'connected-react-router'
import {useDispatch} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import ConfirmedEmailImage from 'images/email_confirmed.png'
import ExpiredEmailImage from 'images/email_expired.png'
import {DARK_PURPLE} from 'styles/material_ui_raw_theme_file'
import media from 'styles/media'

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

  const goToLogin = () => {
    dispatch(push('/login'))
  }

  return (
    <div css={styles}>
      <Paper elevation={7} className="validationPaper">
        <Typography variant="h4" align="center" className="title">
          E-mail vérifié avec succès
        </Typography>
        <img src={ConfirmedEmailImage} alt="E-mail vérifié" className="emailStatusImage" />
        <Typography variant="h5" align="center" className="message">
          Bravo, ton compte a été validé !
        </Typography>
        <Button variant="contained" color="primary" className="button" onClick={() => goToLogin()}>
          Connexion
        </Button>
      </Paper>
    </div>
  )
}
