import App from './components/App';
import { createRoot } from 'react-dom/client';
import React from 'react';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);