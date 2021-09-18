import React ,{Component} from 'react'
import { Popover, Button } from 'antd';
import 'antd/dist/antd.css';
import { BsFillLayersFill } from "react-icons/bs";

class Pov extends Component {
    constructor(props){
        super(props);
        this.text = <span>Choisie une baseMap:</span>;
       this.content = (
      <div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="Esri map" onChange={this.props.changeBaseMap}/>
        <label class="form-check-label" for="flexRadioDefault1">
          Esri map
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="google satellite"  onChange={this.props.changeBaseMap}/>
        <label class="form-check-label" for="flexRadioDefault2">
         google satellite
        </label>
      </div>
      </div>
    );
    }

    handleChange(e){
      console.log( "nemmi choof",e.target.id)
    }

    render(){
        return( 
        <Popover placement="right" title={this.text} content={this.content} >
        <button  type="button" className="btn  btn-sm " style={{backgroundColor:"rgba(48, 95, 153,0.63)"}}> 
       < BsFillLayersFill />
      </button>
        </Popover>)
    }

 
}
export default Pov;