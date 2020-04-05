import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import routes from './routes'
import './assets/style.css'
import Error404 from './views/Errors/Error404'
import { isMobile } from 'react-device-detect'
import ErrorDevice from './views/Errors/ErrorDevice'

class App extends Component {
  render() {
    
    if (isMobile) 
      return (
        <ErrorDevice />
      )
    return (
      <BrowserRouter>
        <Switch>
            {
              routes.map((route, index) => {
                return (<Route 
                      key={index} 
                      path={route.path} 
                      exact={route.exact} 
                      component={(props) => {
                        return (
                          <route.layout {...props} >
                            <route.component {...props} />
                          </route.layout>
                        );
                      }}   
                  />
                )
              })
            }
            <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App

