import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from '../renderer/App';

// jest.mock('../renderer/views/home.view.tsx');
jest.mock(
  'electron',
  () => {
    const mElectron = { ipcRenderer: { on: jest.fn(), send: jest.fn() } };
    return mElectron;
  },
  { virtual: true }
);

it('App loads', () => {
  const app = render(
    <HashRouter>
      <App />
    </HashRouter>
  );

  expect(app).toBeTruthy();
});
