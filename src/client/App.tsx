import { Route, Routes } from 'react-router-dom';
import emotionReset from 'emotion-reset';
import { css, Global } from '@emotion/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import React from 'react';
import '../style/login.scss';

const reset = css`
  ${emotionReset}

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
      'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
  }
`;

function App() {
  return (
    <React.Fragment>
      <Global styles={reset} />
      <Routes>
        <Route index element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
