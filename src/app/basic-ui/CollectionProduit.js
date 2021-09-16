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

const options = [
  { label: 'Ovins', value: 'Ovins' },
  { label: 'Bovin', value: 'Bovin' },
  { label: 'Volaille', value: 'Volaille' },
];
const gender = [ 
    { label: 'mâle', value: "mâle" },
    { label: 'femelle', value: "femelle" }
  ];
const { Option } = Select;

const Reproduction = [ 
  { label: 'Oui', value: "Oui" },
  { label: 'Non', value: "Non" }
];
const { TextArea } = Input;

class Collect extends React.Component {
  constructor(props){
    super(props);
    if(this.props.expl){
        var {errige,source_eau,type,batiment,id_exploitation,culture_permanent,note,date_exploitation,nom,type_source_eau,distance_eau,vulnérable,certification,zone_spécifique,système_irrigation}=this.props.expl;
        this.state = {Reproduction:"Non",nom:nom,type:type,batiment:String(batiment),errige:String(errige),id_exploitation:id_exploitation,source_eau:String(source_eau),culture_permanent:String(culture_permanent),note:note,date_exploitation:date_exploitation,type_source_eau:type_source_eau,distance_eau:distance_eau,vulnérable:String(vulnérable),certification:certification,zone_spécifique:zone_spécifique,système_irrigation:système_irrigation}
        console.log("hakhona",this.props.expl)
        console.log(this.state)
        
    }
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.select_spécifique=this.select_spécifique.bind(this);
    this.select_certification=this.select_certification.bind(this);
    this.onChange_date_naissance=this.onChange_date_naissance.bind(this);
    this.onChange_date_Exploitation=this.onChange_date_Exploitation.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
    this.optionMaman()

    
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
  onChange_date_naissance(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_birth":dateString})
  }

  
  
  
  handleOk = (e) => {
    var test = false
    if(!this.state.date) {test = true ;  toast.error('ajouter une date' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});}
    
    
    if((this.state.Lait || this.state.Engrais_naturel || this.state.Oeuf) && test === false)
      {fetch("http://localhost:3001/update_ProduitAnimal",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
            Lait:this.state.Lait,
            Oeuf:this.state.Oeuf,
            Engrais_naturel:this.state.Engrais_naturel,
            type:this.state.type,
            date:this.state.date,
            id_exp:JSON.parse(sessionStorage.getItem('user')).id,
            id_exploitation:this.state.id_exploitation
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
     toast.success('Les informations sur l\'exploitation ont été mises à jour avec success.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
   })}
   else  toast.warn('il y a un manque d\'informations ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

   if(this.state.Reproduction ==="Oui"){
    fetch("http://localhost:3001/add_animal",{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
              gender:this.state.gender,
              date_birth:this.state.date_birth,
              race:this.state.race,
              note:this.state.note,
              sous_famille:this.state.sous_famille,
              id_exploitation:this.state.id_exploitation,
              id_maman:this.state.id_ann
        })
   }).then(response =>{
     if(response.ok){
       return response.json();
     }
     throw new Error('request failed');}, networkError => console.log(networkError))
     .then(responseJson =>{
      toast.success('L\'animal a été ajouté avec succès' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
       console.log(responseJson)
     })
   }

   
      
     
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
    console.log("ello",target.value);
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 

  

  onChange_date_Exploitation(date,dateString) {
    console.log(date,dateString);
    this.setState({"date":dateString})
  }


  async optionMaman(){
    this.data = await fetch("http://localhost:3001/get_maman",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        gender:'femelle',
        id_exploitation:this.state.id_exploitation
      })
 }).then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2

         })
         this.setState({Maman:this.data})
         
    
//     return this.data.map((aliment, index) => {
//         const { id_aliment,nom } = aliment //destructuring
//         return (
//       <option value={id_aliment}>{nom}</option>
//     )
//   })

}

handleChange_value(e){
    console.log(e.target.value)
    this.setState({id_ann:JSON.parse(e.target.value).id_ann})
}


  render() {
    if(this.state.Maman){
        var lolo = this.state.Maman.map((e, key) => {
         return <option key={e.id_ann} value={JSON.stringify(e)}>{e.id_ann}</option>;
         })
     }
   
      console.log("ha state",this.state)
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <button type="button" class="btn btn-warning btn-lg btn-block" onClick={this.showModal}>Collecter des produits</button>

        
        <Modal
          title="Collecter des produits de votre production"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          
        
   <p>Date de collect</p>
      <DatePicker onChange={this.onChange_date_Exploitation}/>

    { (this.state.type === 'Bovin' ) &&<><p>Lait</p>
    <InputGroup className="mb-3">
          <FormControl
            placeholder="Lait"
            type='Number'
            name="Lait"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          <InputGroup.Text id="basic-addon2">l</InputGroup.Text>
        </InputGroup>
        </>}

    { (this.state.type === 'Volaille' ) &&<><p>Oeufs</p>
    <InputGroup className="mb-3">
          <FormControl
            placeholder="Oeuf"
            type='Number'
            name="Oeuf"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          <InputGroup.Text id="basic-addon2">Oeuf</InputGroup.Text>
        </InputGroup>
        </>}

        <p>Engrais</p>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Engrais"
            type='Number'
            name="Engrais_naturel"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          <InputGroup.Text id="basic-addon2">Kg</InputGroup.Text>
        </InputGroup>

        <p>Reproduction</p>
    <Radio.Group
          options={Reproduction}
          name="Reproduction"
          onChange={this.handlechange}
          value={this.state.Reproduction}
          optionType="button"
          buttonStyle="solid"
        />

        {(this.state.Reproduction === "Oui") &&<>

        <p>Mère</p>
        <select class="custom-select" aria-label="Default select example" onChange={this.handleChange_value}>
        <option defaultValue>choisie la mère de votre animal</option>
        
        {lolo}
        
        </select>
        <br/>
        <br/>

            <p>Race</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="race de votre animal"
            name="race"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          
        </InputGroup>
            <p>Sexe</p>
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

<p>Statut</p>
    <TextArea rows={2} name="note" onChange={this.handlechange} />

            </>
            
        }

        



        </Modal>
      </div>
    );
  }
}


export default Collect