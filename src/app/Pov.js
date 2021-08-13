import React ,{Component} from 'react'
import { Popover, Button } from 'antd';
import 'antd/dist/antd.css';


class Pov extends Component {
    constructor(props){
        super(props);
        this.text = <span>Choisie une baseMap:</span>;
       this.content = (
      <div>
        <a name="Esri map" onClick={this.props.changeBaseMap} >Esri map</a><br/> <br/>
        <a name="google satellite" onClick={this.props.changeBaseMap} >google (satellite)</a>
      </div>
    );
    }

    render(){
        return( 
        <Popover placement="right" title={this.text} content={this.content} trigger="click">
        <button visible type="button" className="btn btn-success btn-sm ">
      + Add
      </button>
        </Popover>)
    }

 
}
export default Pov;