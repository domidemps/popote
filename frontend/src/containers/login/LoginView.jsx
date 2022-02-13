/** @jsx jsx */
import { jsx } from "@emotion/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { push } from "connected-react-router"
import Paper from "@material-ui/core/Paper"
import styled from "styled-components"
import { devices } from "src/styles/media"

import { LogoContainer } from "./LoginView/LogoContainer"
import { LoginForm } from "./LoginView/LoginForm"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: ${window.innerHeight}px;
`

const LoginPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  width: 60%;
  min-height: 120px;
  padding: 20px 0;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  @media ${devices.horizontalTablet} {
    width: 70%;
  }
  @media ${devices.verticalTablet} {
    width: 80%;
  }
  @media ${devices.smartphone} {
    flex-direction: column;
  }
`

export const LoginView = () => {
  const dispatch = useDispatch()
  const authenticated = useSelector((state) => state.user.authenticated)

  useEffect(() => {
    if (authenticated) {
      dispatch(push("/"))
    }
  }, [authenticated])

  return (
    <Layout>
      <LoginPaper elevation={7}>
        <LogoContainer />
        <LoginForm />
      </LoginPaper>
    </Layout>
  )
}
