import React from 'react';
import NavigationBar from './components/NavigationBar';
import BaseForm from './components/Form';
import FetchConversionTable from './components/FetchConversionTable';
import { Route, Switch } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route exact path="/conversionTable" component={FetchConversionTable} />
        <Route exact path="/conversionForm" component={BaseForm} />
      </Switch>
    </div>
  );
};
