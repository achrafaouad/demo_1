import React ,{Component} from 'react'
import { Popover, Button} from 'antd';
import Autocomplete from "react-google-autocomplete";

class AutoComplete extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return( 
            <Autocomplete
         
        style={{ width: "100%" }}
        onPlaceSelected={(place) => {
        { place.geometry && this.props.coordinate(place.geometry.location.lng(), place.geometry.location.lat());}
          
        }}
        types={["(regions)"]}
        componentRestrictions={{ country: "ma" }}
      />

        )
    }

 
}
export default AutoComplete;