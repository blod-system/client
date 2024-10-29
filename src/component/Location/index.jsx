import { useState, useMemo, useEffect } from 'react';
import {
	useMap,
	InfoWindow,
	AdvancedMarker,
	useMapsLibrary,
} from '@vis.gl/react-google-maps';

const Location = () => {
	const [position, setPosition] = useState(null);
	const [markers, setMarkers] = useState(null);
	const [selectPlace, setSelectPlace] = useState(null);

	const placesLib = useMapsLibrary('places');
	const map = useMap();
	const placeService = useMemo(() => {
		if (map && placesLib) {
			return new placesLib.PlacesService(map);
		}
	}, [map, placesLib]);

	function getPosition() {
		navigator.geolocation.getCurrentPosition((data) => {
			setPosition({ lat: data.coords.latitude, lng: data.coords.longitude });
		});
	}

	function handelMarkerClick(place) {
		placeService.getDetails(
			{
				placeId: place.placeId,
			},
			(res) => {
				setSelectPlace(res);
			},
		);
	}

	useEffect(() => {
		if (!placesLib || !map || !position) return;
		const request = {
			location: position,
			radius: 2000,
			query: '捐血中心',
		};

		placeService.textSearch(request, (responseData) => {
			if (responseData.length === 0) return null;
			const newMarkers = [];
			const bounds = new google.maps.LatLngBounds();
			responseData.forEach((place) => {
				if (!place.geometry || !place.geometry.location) return;
				newMarkers.push({
					position: place.geometry.location,
					title: place.name,
					placeId: place.place_id,
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
	}, [map, position, placesLib]);

	return (
		<>
			<div
				className="w-8 h-8 rounded-full border-4 border-[#000] absolute bottom-52 right-4 z-10"
				onClick={getPosition}></div>
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
							className={`font-medium ${
								selectPlace.opening_hours?.isOpen()
									? 'text-green-600'
									: 'text-red-600'
							}`}>
							{selectPlace.opening_hours?.isOpen() ? '營業中' : '已打烊'}
						</p>
						<div className="ml-2">
							營業時間：
							{selectPlace.opening_hours.weekday_text &&
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

export default Location;
