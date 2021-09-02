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

const gender = [ 
  { label: 'mâle', value: "mâle" },
  { label: 'femelle ', value: "femelle " }
];
const { TextArea } = Input;

class ModifierAnimal extends React.Component {
  constructor(props){
    super(props);
    if(this.props.expl){
        var {id_ann,gender,date_birth,race,sous_famille,note,prix}=this.props.expl;
        this.state = {id_ann:id_ann,gender:gender,date_birth:date_birth,race:race,sous_famille:sous_famille,note:note,prix:prix}
        console.log("hakhona",this.props.expl)
        console.log(this.state)
        
    }
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.select_spécifique=this.select_spécifique.bind(this);
    this.select_certification=this.select_certification.bind(this);
   
    this.onChange_date_Exploitation=this.onChange_date_Exploitation.bind(this);
    

    
  }


  select_certification(value) {
    console.log(`selected ${value}`);
    this.setState({certification:value})
  }
  select_spécifique(value) {
    console.log(`selected ${value}`);
    this.setState({zone_spécifique:value})
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  
  
  
  handleOk = (e) => {
    
    
      fetch("http://localhost:3001/update_Animal",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        gender:this.state.gender,
        date_birth:this.state.date_birth,
        race:this.state.race,
        sous_famille:this.state.sous_famille,
        note:this.state.note,
        prix:this.state.prix,
        id_ann:this.state.id_ann
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

  

  onChange_date_Exploitation(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_birth":dateString})
  }


  render() {
   
      console.log("ha state",this.state)
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <Button id="infoAdd"type="primary" onClick={this.showModal}>Modifier</Button>
        <Modal
          title="modifier les information de votre production"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        
        <p>Race</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="race de votre animal"
            name="race"
            value={this.state.race}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
        </InputGroup>
        
  <p>Date de naissance</p>
    <DatePicker onChange={this.onChange_date_Exploitation}/>

    <p>sexe</p>
    <Radio.Group
          options={gender}
          name="gender"
          onChange={this.handlechange}
          value={this.state.gender}
          optionType="button"
          buttonStyle="solid"
        />

        <p>Prix d'achat</p>
       
       <InputGroup className="mb-3">
       <FormControl
         placeholder="race de votre animal"
         name="prix"
         value={this.state.prix}
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       <InputGroup.Text id="basic-addon2">dh</InputGroup.Text>
     </InputGroup>


    <p>Sous famille</p>
       
       <InputGroup className="mb-3">
       <FormControl
         placeholder="race de votre animal"
         name="sous_famille"
         value={this.state.sous_famille}
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       
     </InputGroup>
     
    <p>statut</p>
    <TextArea rows={2} name="note" value={this.state.note} onChange={this.handlechange} />


        </Modal>
      </div>
    );
  }
}


export default ModifierAnimal