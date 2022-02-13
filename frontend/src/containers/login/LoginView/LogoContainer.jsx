/** @jsx jsx */
import { jsx } from "@emotion/core"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"

import PopoteLogo from "src/images/popote_logo.png"
import { DARK_PURPLE } from "src/styles/material_ui_raw_theme_file"
import { devices } from "src/styles/media"

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled(Typography)`
  margin: 20px 5px;
  font-weight: 500;
  color: ${DARK_PURPLE};

  @media ${devices.horizontalTablet} {
    font-size: 1.2rem;
  }
  @media ${devices.smartphone} {
    font-size: 1.5rem;
  }
`

const Logo = styled.img`
  width: 60%;
  @media ${devices.horizontalTablet} {
    width: 50%;
  }
`

export const LogoContainer = () => (
  <Layout>
    <Logo src={PopoteLogo} alt="Popote" />
    <Title variant="h5" align="center">
      Toutes mes recettes, au même endroit.
    </Title>
  </Layout>
)
