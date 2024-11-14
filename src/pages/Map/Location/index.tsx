import { useState, useMemo, useEffect } from 'react';
import {
	useMap,
	InfoWindow,
	AdvancedMarker,
	useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { AimOutlined } from '@ant-design/icons';


interface Position {
	lat: number;
	lng: number;
}
interface Marker {
	position: google.maps.LatLng;
	title: string;
	placeId: string;
}
interface PlaceDetails {
	name: string;
	vicinity: string;
	rating: number;
	formatted_phone_number: string;
	opening_hours?: {
		isOpen: () => boolean;
		weekday_text: string[];
	};
	geometry: {
		location: google.maps.LatLng
	}
}
export default function Location() {
	const [position, setPosition] = useState<Position | null>(null);
	const [markers, setMarkers] = useState<Marker[] | null>(null);
	const [selectPlace, setSelectPlace] = useState<PlaceDetails | null>(null);

	const placesLib = useMapsLibrary('places');
	const map = useMap();
	const placeService = useMemo(() => {
		if (map && placesLib) {
			return new placesLib.PlacesService(map);
		}
		return null
	}, [map, placesLib]);

	function getPosition() {
		navigator.geolocation.getCurrentPosition((data) => {
			setPosition({ lat: data.coords.latitude, lng: data.coords.longitude });
		});
	}

	function handelMarkerClick(place: Marker) {
		if (placeService) {
			placeService.getDetails(
				{
					placeId: place.placeId,
				},
				(res) => {
					setSelectPlace(res as PlaceDetails);
				},
			);
		}
	}

	useEffect(() => {
		if (!placesLib || !map || !position || !placeService) return;
		const request = {
			location: position,
			radius: 2000,
			query: '捐血中心',
		};

		placeService.textSearch(request, (responseData) => {
			if (!responseData || responseData.length === 0) return null;
			const newMarkers: Marker[] = [];
			const bounds = new google.maps.LatLngBounds();
			responseData.forEach((place) => {
				if (!place.geometry || !place.geometry.location) return;
				newMarkers.push({
					position: place.geometry.location,
					title: place.name || '',
					placeId: place.place_id || '',
				});
				if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}
			});

			setMarkers(newMarkers);
			map.fitBounds(bounds);
		});
	}, [map, position, placesLib, placeService]);

	return (
		<>
			<button
				className="w-8 h-8 rounded-full border-slate-700 absolute bottom-52 right-4 z-10 flex items-center justify-center cursor-pointer drop-shadow-2xl"
				onClick={getPosition}>
				<AimOutlined className='text-4xl text-slate-700 hover:scale-125' />
			</button>
			{markers &&
				markers.map((marker, index) => (
					<AdvancedMarker
						key={index}
						position={marker.position}
						title={marker.title}
						onClick={() => handelMarkerClick(marker)}
					/>
				))}
			{selectPlace && (
				<InfoWindow
					position={{
						lat: selectPlace.geometry.location.lat(),
						lng: selectPlace.geometry.location.lng(),
					}}
					onCloseClick={() => setSelectPlace(null)}>
					<h3 className="font-medium">{selectPlace.name}</h3>
					<p>地址：{selectPlace.vicinity}</p>
					<p>評分：{selectPlace.rating}</p>
					<p>電話：{selectPlace.formatted_phone_number}</p>
					<div className="flex ">
						<p
							className={`font-medium ${selectPlace.opening_hours?.isOpen()
								? 'text-green-600'
								: 'text-red-600'
								}`}>
							{selectPlace.opening_hours?.isOpen() ? '營業中' : '已打烊'}
						</p>
						<div className="ml-2">
							營業時間：
							{selectPlace.opening_hours?.weekday_text &&
								selectPlace.opening_hours.weekday_text.map((time) => (
									<p key={time}>{time}</p>
								))}
						</div>
					</div>
				</InfoWindow>
			)}
		</>
	);
};

