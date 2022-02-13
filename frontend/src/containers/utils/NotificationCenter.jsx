/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { resetNotification } from "actions/utils"

export default function NotificationCenter() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const { severity, message } = useSelector((state) => state.notifications)

  useEffect(() => {
    if (Boolean(message) && !open) {
      setOpen(true)
    }
  }, [message])

  const handleClose = () => {
    setOpen(false)
    dispatch(resetNotification(null))
  }

  if (!Boolean(message)) {
    return null
  }

  return (
    <Snackbar open={open} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  )
}
