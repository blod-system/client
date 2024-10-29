import { StrictMode } from 'react';
import React from 'react';
import ReactDom from 'react-dom/client';
// import App from './App'
import './index.css';
import Map from './component/Map';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Map />
	</StrictMode>,
);
