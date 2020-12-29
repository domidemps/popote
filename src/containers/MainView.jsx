/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import {useDispatch} from 'react-redux'
import {push} from 'connected-react-router'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import {INTENSE_YELLOW, MEDIUM_PURPLE, DARK_PURPLE} from 'styles/material_ui_raw_theme_file'
import AddNotes from 'images/add_notes.svg'
import {logout} from 'actions/user'

const styles = css`
  .appBar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .body {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .signOut {
    color: white;
  }
  .message {
    color: ${DARK_PURPLE};
    margin: 40px;
    text-align: center;
  }
`

export default function MainView() {
  const dispatch = useDispatch()

  const doSignOut = () => {
    dispatch(logout())
    dispatch(push('/login'))
  }

  return (
    <div css={styles}>
      <AppBar position="sticky" className="appBar" color="secondary">
        <IconButton color="primary" aria-label="Sign out" onClick={doSignOut}>
          <ExitToAppIcon className="signOut" />
        </IconButton>
      </AppBar>
      <div className="body">
        <img src={AddNotes} alt="Ajouter une recette" />
        <Typography variant="h4" align="center" className="message">
          Le carnet de recette est vide !
        </Typography>
      </div>
    </div>
  )
}
