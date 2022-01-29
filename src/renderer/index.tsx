import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import '../../assets/styles/_app.global.scss';
import App from './App';

render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
