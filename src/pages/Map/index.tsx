import { APIProvider, Map as GoogleMap } from '@vis.gl/react-google-maps';
import Location from './Location/index';

const position = {
	lat: 23.553118,
	lng: 121.0211024,
};

function Map() {
	return (
		<div className=" h-full relative">
			<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY!}>
				<div className="w-full h-full">
					<GoogleMap
						defaultZoom={9}
						defaultCenter={position}
						mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
					>
						<Location />
					</GoogleMap>
				</div>
			</APIProvider>
		</div>
	);
}

export default Map;
