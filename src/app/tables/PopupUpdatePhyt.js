import React from 'react';
import moment from 'moment';
import { Modal, version, Button } from 'antd';
import 'antd/dist/antd.css';
import { BsFillGearFill, BsCaretRight } from "react-icons/bs";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Select } from 'antd';
import { Input } from 'antd';
import { Radio ,DatePicker } from 'antd';
import { Slider, Switch } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

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

class PopupUpdatePhyt extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.onChangeDate=this.onChangeDate.bind(this);
    
   
    this.hour = 0;

    
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    fetch("http://localhost:3001/updatePhytosantaire",{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
            prix_uni:this.state.prix_uni,
            VALIDE_DEPUIS:this.state.VALIDE_DEPUIS,
            id_prod:this.props.choosen.id_prod
              
        })
   }).then(response =>{
     if(response.ok){
       return response.json();
     }
     throw new Error('request failed');}, networkError => console.log(networkError))
     .then(responseJson =>{
       console.log(responseJson)
       toast.success('le prix été bien mis a jour. ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
     })
    
    
     
      
     
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

  onChangeDate(date, dateString) {
    console.log(date, dateString);
    this.setState({ VALIDE_DEPUIS: dateString });
  }
 
  handleChange(e){
    this.setState({prix_uni:e.target.value})
  }

  



 


  render() {  
    
    console.log(this.props.choosen)
    return (
      <div>
       <Button id="infoAdd"type="danger" onClick={this.showModal}> <i   > <BsFillGearFill/> </i> </Button> 
         {/* <Button id="infoAdd"type="primary" onClick={this.showModal}>ajouter des travaux</Button>  */}
        <Modal
          title="Modifier le prix de votre personnel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
            <p>Nouveau prix</p>

                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" name = "hour" onChange={this.handleChange}/>
                <span class="input-group-text" id="basic-addon2">dh/{this.props.choosen.unité}</span>
                </div>

              
                <p>Valide depuis le</p>
                 
                  <DatePicker onChange={this.onChangeDate} />
                
            
           
             
          
        
       
   

        </Modal>
      </div>
    );
  }
}


export default PopupUpdatePhyt