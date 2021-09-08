import React from 'react';
import moment from 'moment';
import { Modal, version, Button } from 'antd';
import 'antd/dist/antd.css';
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

class PopupNewTraitment extends React.Component {
  constructor(props){
    super(props);
    this.state = { visible: this.props.visible, typeFoncier: false ,production:"animal"};
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
   
    this.onChange_date_naissance=this.onChange_date_naissance.bind(this);
    

    
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    
    
      fetch("http://localhost:3001/add_NewTraitement",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        operation:this.state.operation,
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
     toast.success('Le traitement a été ajouté avec succès.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
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
 

  handlechange({target}){
    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 

  

  onChange_date_naissance(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_birth":dateString})
  }


  render() {
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <Button id="infoAdd"type="primary" onClick={this.showModal}>Ajouter un traitement</Button>
        <Modal
          title="Ajouter Votre animal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        
        <p>Opération</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="ajouter une opération"
            name="operation"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

 

   

        </Modal>
      </div>
    );
  }
}


export default PopupNewTraitment