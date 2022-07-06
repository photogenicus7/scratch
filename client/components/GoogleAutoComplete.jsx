import React, { useState } from 'react';
import Map from './map.js';

import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng
} from 'react-places-autocomplete';

const GoogleAutoComplete = () => {
    [address, setAddress] = useState('22 winchester dr, Lexington, MA 02420');
    [centerCoordinates, setCenterCoordinates] = useState([{}])
    [pinsOnMap, setPinsOnMap] = useState({});
   

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
       setCenterCoordinates({lat, lng});

    }

    return (
        <div>
            <PlacesAutocomplete value= {address} onChange= {setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "Destination"})}/>
                        <div>
                            {loading ? <div>...loading</div> : null};
                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#ffb549' : '#fff'
                                };

                                console.log('suggestion---->', suggestion);

                                return(
                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description} 
                                    </div>
                                )

                            })}


                        </div>
                    
                     </div>)}
            </PlacesAutocomplete>
        </div>
    )

};

export default GoogleAutoComplete;