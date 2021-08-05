import React, { Component } from "react";
import { returnOrUpdate } from "ol/extent";

import PlacesAutocomplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng
  } from 'react-places-autocomplete';

 class searchBar extends Component {
      render(){
          return(
            <div>
            <PlacesAutocomplete
              value={this.state.adress}
              onChange={this.handlechange}
              onSelect={this.handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
      
                  <input {...getInputProps({ placeholder: "Type address" })} />
      
                  <div>
                    {loading ? <div>...loading</div> : null}
      
                    {suggestions.map(suggestion => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                      };
      
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          )
      }
  }

  export default searchBar;