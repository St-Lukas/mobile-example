// import 'babel-preset-es2017/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Main from './components/Main'

ReactDOM.render(
    <MuiThemeProvider>
        <Main />
    </MuiThemeProvider>,
    document.getElementById('content')
);
