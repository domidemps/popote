import React from "react"
import ReactDOM from "react-dom"

import { store } from "store/configureStore"
import { history } from "reducers"
import Popote from "root"

window.React = React

const render = (Component) => {
  ReactDOM.render(
    <Component store={store} history={history} />,
    document.getElementById("root"),
  )
}
render(Popote)

if (module.hot) {
  module.hot.accept("./root.jsx", () => {
    const NextPopote = require("./root").default
    render(NextPopote)
  })
}
