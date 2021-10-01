import React from 'react';
import moment from 'moment';
import { Modal, version, Button } from 'antd';
import 'antd/dist/antd.css';
import { BsBriefcaseFill, BsCaretRight } from "react-icons/bs";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Select } from 'antd';
import { Input } from 'antd';
import { Radio ,DatePicker } from 'antd';
import { Slider, Switch } from 'antd';

const { Option } = Select;
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' }
];
const gender = [ 
  { label: 'mâle', value: "mâle" },
  { label: 'femelle', value: "femelle" }
];
const { TextArea } = Input;

class PopupDure extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handleChange=this.handleChange.bind(this);
   
    this.hour = 0;

    
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    
    
     
      
     
    this.setState({
      visible: false,
    });
  }
  
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
 

  
  

  

  handleChange(e){
      console.log(e.target.value)
       
      if(e.target.name === "hour"){
        this.props.hour(e.target.value)
        this.hour = e.target.value
      }
      if(e.target.name === "min"){
        if(e.target.value>59){
            var hours  =(e.target.value) /60
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
             this.hour = Number(this.hour) +Number(rhours) 
            this.props.hour(this.hour)
            this.props.min(rminutes)
        }
        else  this.props.min(e.target.value)
        
      }
      
  }


 


  render() {  
    
    console.log('props', this.state)
    
    console.log(this.props.last_feature)
    return (
      <div>
        <i  onClick={this.showModal} > <BsCaretRight/> </i>
        {/* <Button id="infoAdd"type="primary" onClick={this.showModal}>ajouter des travaux</Button> */}
        <Modal
          title="Ajouter Votre animal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="l'heure" aria-label="l'heure" aria-describedby="basic-addon2" name = "hour" onChange={this.handleChange}/>
  <span class="input-group-text" id="basic-addon2">h</span>
</div>
            
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="min" aria-label="Recipient's username" aria-describedby="basic-addon2" name = "min" onChange={this.handleChange}/>
  <span class="input-group-text" id="basic-addon2">min</span>
</div>
            
           
             
          
        
       
   

        </Modal>
      </div>
    );
  }
}


export default PopupDure