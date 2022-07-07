/** @jsx jsx */
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import EmailSentPicture from 'src/images/email_sent.svg'

export const ConfirmationEmailDialog = ({ isDialogOpen, setIsDialogOpen, email }) => (
  <Dialog
    open={isDialogOpen}
    aria-labelledby="form-dialog-title"
    disableEscapeKeyDown
  >
    <DialogTitle id="form-dialog-title">
      Hop hop, dernière étape !
    </DialogTitle>
    <DialogContent>
      <img src={EmailSentPicture} alt="E-mail envoyé" />
      <DialogContentText>
        Un e-mail de confirmation a été envoyé à l'adresse <u>{email}</u>
        <br />
        Clique sur le lien dans l'e-mail pour valider ton inscription et
        continuer.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsDialogOpen(false)} color="primary">
        Fermer
      </Button>
    </DialogActions>
  </Dialog>
)


ConfirmationEmailDialog.propTypes = {
  isDialogOpen: PropTypes.bool.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
}
