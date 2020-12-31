import logo from './logo.svg';
import './App.css';
import { Admin } from 'react-admin';

// ui
import { Dashboard } from "./common/dashboard";

const App = () => (
  <Admin dashboard={ Dashboard }>
    
  </Admin>
);

export default App;
