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
import { BsFillTrashFill } from "react-icons/bs";
toast.configure();

const { Option } = Select;

const type = [ 
  { label: 'Location', value: "Location" },
  { label: 'propriétaire', value: "propriétaire" }
];

const { TextArea } = Input;

class Delete extends React.Component {
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
   
    var option
       if(this.props.option === 'Materiel'){   option = 'Materiel'; var url = "/deleteMat"}
       if(this.props.option === 'Personnel'){   option = 'Personnel'; var url = "/deletePers"}
       

    
      fetch("http://localhost:3001"+url,{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
       
        id:this.props.expl.id_mat,      
        id_pers:this.props.expl.id_pers
    })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
     if(responseJson ==="error"){
        toast.error("ce " + this.props.option + ' a été utilisé déja' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
     }
     else{
        toast.success(this.props.option + ' a été bien suprimé' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
     }
     this.props.retour()
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
        <button type="button"  class="btn btn-danger btn-lg btn-block" onClick={this.showModal}><BsFillTrashFill/></button>
        <Modal
          title="Modifier les information de votre personnel"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        <div style={{textAlign:"center"}}> 
          Vous êtes sûr de supprimer ce {this.props.option} ?   
          </div> 
        </Modal>
      </div>
    );
  }
}


export default Delete