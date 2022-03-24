// in src/customRoutes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Support from './Support';

export default [
    <Route exact path="/support" component={Support} />,
    <Route exact path="/support/:id" component={Support} />
];