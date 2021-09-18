import React ,{Component} from 'react'
import { Popover, Button } from 'antd';
import { Input } from 'antd';
import { AiOutlineFilter } from "react-icons/ai";
import 'antd/dist/antd.css';
import { BsFillLayersFill } from "react-icons/bs";
const { Search } = Input;
class Filter extends Component {
    constructor(props){
        super(props); 
        this.text = <span>Filtrer vos exploitation:</span>;
       this.content = (
<>
        <Search  placeholder="filtrer vos exploitation" onSearch={this.props.serchValue} />
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Exploitation animale" id="test1" defaultChecked onChange={this.props.handleCh} />
            <label class="form-check-label" for="test1">
            Exploitation animale    
            </label>
            </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Exploitation Vegetale" id="test2" defaultChecked onChange={this.props.handleCh} />
            <label class="form-check-label" for="test2">
              Exploitation Végétale    
            </label>
            </div>
            </>
    );
    }

    handleChange(e){
      console.log( "nemmi choof",e.target.id)
    }

    render(){
        return( 
        <Popover placement="right" title={this.text} content={this.content}>
        <button  type="button" className="btn btn-sm " style={{backgroundColor:"rgba(48, 95, 153,0.63)"}}> 
       <AiOutlineFilter/>
      </button>
        </Popover>)
    }

 
}
export default Filter;