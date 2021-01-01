import logo from './logo.svg';
import './App.css';
import { Admin } from 'react-admin';

import dataProvider from "./dataprovider";

// ui
import { Dashboard } from "./common/dashboard";

const App = () => (
  <Admin dashboard={ Dashboard } dataProvider={ dataProvider }>
    
  </Admin>
);

export default App;
