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

const type = [ 
  { label: 'Location', value: "Location" },
  { label: 'propriétaire', value: "propriétaire" }
];

const { TextArea } = Input;

class ModifierMateriel extends React.Component {
  constructor(props){
    super(props);
    if(this.props.expl){
        var {nom,description,model,immatriculation,fabriquant,prix_location_jour,propriétaire,derniere_controle_tec,derniere_assurence,n_enregistrement}=this.props.expl;
        this.state = {nom:nom,description:description,model:model,immatriculation:immatriculation,fabriquant:fabriquant,prix_location_jour:prix_location_jour,propriétaire:propriétaire,derniere_controle_tec:derniere_controle_tec,derniere_assurence:derniere_assurence,n_enregistrement:n_enregistrement}
        console.log("hakhona",this.props.expl)
        console.log(this.state)
        
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.select_spécifique=this.select_spécifique.bind(this);
    this.select_certification=this.select_certification.bind(this);
    this.fileChange = this.fileChange.bind(this);
  }}


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
    
    
      fetch("http://localhost:3001/updateMateriel",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        description:this.state.description,
        model:this.state.model,
        immatriculation:this.state.immatriculation,
        fabriquant:this.state.fabriquant,
        prix_hr:this.state.prix_hr,
        propriétaire:this.state.propriétaire,
        derniere_controle_tec:this.state.derniere_controle_tec,
        derniere_assurence:this.state.derniere_assurence,
        n_enregistrement:this.state.n_enregistrement,
        id:this.props.expl.id_mat      
    })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
     toast.success('les information sont bien mis a jour ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

     if(this.state.myFile){
      const formdata = new FormData();
    formdata.append("materiel", this.state.myFile);
    formdata.append("id", this.props.expl.id_mat );
    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formdata,
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("request failed");
        },
        (networkError) => console.log(networkError)
      )
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({ src: responseJson });
      });
    }












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

  fileChange(e) {
    this.setState({ myFile: e.target.files[0] });
    console.log(e.target.files[0]);
    this.forceUpdate();
  }

  



  render() {
   
      console.log("ha state",this.state)
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <button type="button"  class="btn btn-warning btn-lg btn-block" onClick={this.showModal}>Modifier</button>
        <Modal
          title="Modifier les information de votre personnel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        
        <p>Nom</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="Nom"
            name="nom"
            value={this.state.nom}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Description</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="description"
            name="description"
            value={this.state.description}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Model</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="model"
            name="model"
            value={this.state.model}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

        <p>Immatriculation</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="immatriculation"
            name="immatriculation"
            value={this.state.immatriculation}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Fabriquant</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="fabriquant"
            name="fabriquant"
            value={this.state.fabriquant}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
       
         <p>Propriétaire</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="propriétaire"
            name="propriétaire"
            value={this.state.propriétaire}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> 
        

        
        <p>dernière controle technique</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="derniere_controle_tec"
            name="derniere_controle_tec"
            value={this.state.derniere_controle_tec}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> 
        <p>dernière assurence</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="derniere_assurencer"
            name="derniere_assurence"
            value={this.state.derniere_assurence}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> 
       
          
         
        <p> N° d'Enregistrement</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="n_enregistrement"
            name="n_enregistrement"
            value={this.state.n_enregistrement}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> 
        <div class="mb-1">
              <p>choisie l'image de votre materiel</p>
              <input
                class="form-control"
                type="file"
                name="materiel"
                id="formFile"
                onChange={this.fileChange}
              />
            </div>
        
        
        
    
   


<p>Note</p>
    <TextArea rows={2} name="note" value={this.state.note} onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default ModifierMateriel