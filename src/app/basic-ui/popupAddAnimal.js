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

class Popup extends React.Component {
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
    
    
      fetch("http://localhost:3001/add_animal",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
            gender:this.state.gender,
            date_birth:this.state.date_birth,
            race:this.state.race,
            sous_famille:this.state.sous_famille,
            
            note:this.state.note,
            prix:this.state.prix,
            id_exploitation:this.props.id
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
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
        <Button id="infoAdd"type="primary" onClick={this.showModal}>ajouter un animal</Button>
        <Modal
          title="Ajouter Votre animal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        
        <p>race</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="race de votre animal"
            name="race"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

  <p>sous famille</p>
    <Input  placeholder="sous famille" name="sous_famille" onChange={this.handlechange} />
    
    
       <p>prix d'achat</p>
       <InputGroup className="mb-3">
       <FormControl
         type="Number"
         placeholder="prix d'achat"
         name="prix"
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       <InputGroup.Text id="basic-addon2">dh</InputGroup.Text>
     </InputGroup>
    

    <p>sexe</p>
    <Radio.Group
          options={gender}
          name="gender"
          onChange={this.handlechange}
          value={this.state.gender}
          optionType="button"
          buttonStyle="solid"
        />
   

<br/>

<p>Date de naissance</p>
    <DatePicker onChange={this.onChange_date_naissance}/>

<p>statut</p>
    <TextArea rows={2} name="note" onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default Popup