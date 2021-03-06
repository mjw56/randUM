import React from 'react';
import Router from 'react-router';
import Header from './components/header.react';
import Home from './components/home.react';

let { DefaultRoute, Route, RouteHandler } = Router;

let App = React.createClass({

  render() {
    return (
      <div className="container">
        <Header />

        <RouteHandler/>
      </div>
    );
  }

});

let routes = <Route handler={App}>
  <DefaultRoute name="home"   handler={Home}/>
</Route>

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body)
})
