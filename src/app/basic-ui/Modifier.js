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
  { label: 'oui', value: "true" },
  { label: 'non', value: "false" }
];
const { TextArea } = Input;

class Modifier extends React.Component {
  constructor(props){
    super(props);
    if(this.props.expl){
        var {errige,source_eau,culture_permanent,note,date_exploitation,nom,type_source_eau,distance_eau,vulnérable,certification,zone_spécifique,système_irrigation}=this.props.expl;
        this.state = {nom:nom,errige:String(errige),source_eau:String(source_eau),culture_permanent:String(culture_permanent),note:note,date_exploitation:date_exploitation,type_source_eau:type_source_eau,distance_eau:distance_eau,vulnérable:String(vulnérable),certification:certification,zone_spécifique:zone_spécifique,système_irrigation:système_irrigation}
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
    
    
      fetch("http://localhost:3001/update_exploitationVeg",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
            nom:this.state.nom,
            culture_permanent:this.state.culture_permanent,
            source_eau:this.state.source_eau,
            irrige:this.state.irrige,
            note:this.state.note,
            date_exploitation:this.state.date_exploitation,
            id_exploitation:this.props.id,
            type_source_eau:this.state.type_source_eau,
            distance_eau:this.state.distance_eau,
            vulnérable:this.state.vulnérable,
            certification:this.state.certification,
            zone_spécifique:this.state.zone_spécifique,
            système_irrigation:this.state.système_irrigation
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
    this.setState({"date_exploitation":dateString})
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
          
        
        <p>Nom</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="race de votre animal"
            name="nom"
            value={this.state.nom}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>

    <p>Culture permanent</p>
    <Radio.Group
          options={gender}
          name="culture_permanent"
          onChange={this.handlechange}
          value={this.state.culture_permanent}
          optionType="button"
          buttonStyle="solid"
        />
      
    <p>source d'eau</p>
    <Radio.Group
          options={gender}
          name="source_eau"
          onChange={this.handlechange}
          value={this.state.source_eau}
          optionType="button"
          buttonStyle="solid"
        />
    <p>Irrigué</p>
    <Radio.Group
          options={gender}
          name="errige"
          onChange={this.handlechange}
          value={this.state.errige}
          optionType="button"
          buttonStyle="solid"
        />
    
    <p>Système d’irrigation</p>
    
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="Système d’irrigation"
            name="système_irrigation"
            value={this.state.système_irrigation}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
    <p>Est dans une zone spécifique ?</p>
    <Select defaultValue={this.state.zone_spécifique} style={{ width: "200px" }} onChange={this.select_spécifique}>
      <Option value="Entierrement">Entierrement</Option>
      <Option value="Non">Non</Option>
      <Option value="Parciellement">Parciellement</Option>
    </Select>

    <p>Zone vulnérable</p>
    <Radio.Group
          options={gender}
          name="vulnérable"
          onChange={this.handlechange}
          value={this.state.vulnérable}
          optionType="button"
          buttonStyle="solid"
        /> 

    <p>Système de certification</p>
    <Select defaultValue={this.state.certification} style={{ width: "200px" }} onChange={this.select_certification}>
      <Option value="Conventionnelle">Conventionnelle</Option>
      <Option value="Intégrée">Intégrée</Option>
      <Option value="Biologique">Biologique</Option>
    </Select>

<br/>
<p>Distance de la source d’eau (m)</p>
    
       
          <InputGroup className="mb-3">
          <FormControl
            type="Number"
            placeholder="Distance de la source d’eau "
            name="distance_eau"
            value={this.state.distance_eau}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
        <p>Type de source d’eau</p>
    
       
    <InputGroup className="mb-3">
    <FormControl
      placeholder="Type de source d’eau"
      name="type_source_eau"
      value={this.state.type_source_eau}
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
      onChange={this.handlechange}
    />
    
  </InputGroup>


<p>Date d'exploitation</p>
    <DatePicker onChange={this.onChange_date_Exploitation}/>

<p>Note</p>
    <TextArea rows={2} name="note" value={this.state.note} onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default Modifier