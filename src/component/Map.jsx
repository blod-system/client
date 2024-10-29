'use client';
// import { useState, useEffect } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Location from './Location/index';
function App() {
	const position = {
		lat: 23.553118,
		lng: 121.0211024,
	};

	return (
		<div className="w-full h-screen relative">
			<APIProvider apiKey={process.env.GOOGLE_MAP_API_KEY}>
				<div className="w-full h-full">
					<Map
						defaultZoom={9}
						defaultCenter={position}
						mapId={process.env.GOOGLE_MAP_ID}>
						<Location />
					</Map>
				</div>
			</APIProvider>
		</div>
	);
}

export default App;
