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

const type = [ 
  { label: 'OPÉRATEUR', value: "OPÉRATEUR" },
  { label: 'PRESTATAIRE', value: "PRESTATAIRE" },
  { label: 'INCONNU', value: "INCONNU" }
];
const Personnel = [ 
  { label: 'Saisonnier', value: "Saisonnier" },
  { label: 'permanent', value: "permanent" },
  
];
const qualification = [ 
  { label: 'BASIQUE', value: "BASIQUE" },
  { label: 'QUALIFIÉ', value: "QUALIFIÉ" },
  { label: 'FUMIGATEUR', value: "FUMIGATEUR" },
  { label: 'PILOTE', value: "PILOTE" }
];
const conseiller = [ 
  { label: 'Oui', value: "Oui" },
  { label: 'Non', value: "Non" }
];
const { TextArea } = Input;

class ModifierPersonnel extends React.Component {
  constructor(props){
    super(props);
    if(this.props.expl){
        var {id_pers,nom,adress,ville,cin,pays,id_exp,salaire_mois,salaire_jr,tva,type,niveau_qualification,certiphyto,conseiller,email,téléphone,code_insee}=this.props.expl;
        this.state = {nom:nom,id_pers:id_pers,adress:adress,ville:ville,salaire_jr:salaire_jr,cin:cin,pays:pays,id_exp:id_exp,salaire_mois:salaire_mois,tva:tva,type:type,niveau_qualification:niveau_qualification,certiphyto:certiphyto,conseiller:conseiller,email:email,téléphone:téléphone,code_insee:code_insee}
        console.log("hakhona",this.props.expl)
        console.log(this.state)
        
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.select_spécifique=this.select_spécifique.bind(this);
    this.select_certification=this.select_certification.bind(this);
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
    
    
      fetch("http://localhost:3001/update_personnel",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        id_pers:this.state.id_pers,
        adress:this.state.adress,
        ville:this.state.ville,
        salaire_jr:this.state.salaire_jr,
        cin:this.state.cin,
        pays:this.state.pays,
        id_exp:this.state.id_exp,
        salaire_mois:this.state.salaire_mois,
        tva:this.state.tva,
        type:this.state.type,
        niveau_qualification:this.state.niveau_qualification,
        certiphyto:this.state.certiphyto,
        conseiller:this.state.conseiller,
        email:this.state.email,
        téléphone:this.state.téléphone,
        code_insee:this.state.code_insee
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

  



  render() {
   
      console.log("ha state",this.state)
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <Button id="infoAdd"type="primary" onClick={this.showModal}>Modifier</Button>
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
        <p>Adresse</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="Adresse"
            name="adress"
            value={this.state.adress}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Ville</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="ville"
            name="ville"
            value={this.state.ville}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

        <p>CIN</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="cin"
            name="cin"
            value={this.state.cin}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Pays</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="pays"
            name="pays"
            value={this.state.pays}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Personnel</p>
       <Radio.Group
          options={Personnel}
          name="Personnel"
          onChange={this.handlechange}
          value={this.state.Personnel}
          optionType="button"
          buttonStyle="solid"
        />
         {(this.state.Personnel ==="permanent") && <><p>salaire par mois</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="salaire_mois"
            name="salaire_mois"
            value={this.state.salaire_mois}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> </>}

        {(this.state.Personnel === "Saisonnier") && <><p>salaire par jour</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="salaire par jour"
            name="salaire_jr"
            value={this.state.salaire_jr}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup> </>}
        <p>TVA</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="tva"
            name="tva"
            value={this.state.tva}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>N° Certiphyto</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="N°certiphyto"
            name="certiphyto"
            value={this.state.certiphyto}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Email</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="email"
            name="email"
            value={this.state.email}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Téléphone</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="téléphone"
            name="téléphone"
            value={this.state.téléphone}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Code Insee</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="code_insee"
            name="code_insee"
            value={this.state.code_insee}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

    <p>Type</p>
    <Radio.Group
          options={type}
          name="type"
          onChange={this.handlechange}
          value={this.state.type}
          optionType="button"
          buttonStyle="solid"
        />
      
    <p>Niveau de qualification</p>
    <Radio.Group
          options={qualification}
          name="niveau_qualification"
          onChange={this.handlechange}
          value={this.state.niveau_qualification}
          optionType="button"
          buttonStyle="solid"
        />
    <p>Est un conseiller</p>
    <Radio.Group
          options={conseiller}
          name="conseiller"
          onChange={this.handlechange}
          value={this.state.conseiller}
          optionType="button"
          buttonStyle="solid"
        />
    
   


<p>Note</p>
    <TextArea rows={2} name="note" value={this.state.note} onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default ModifierPersonnel