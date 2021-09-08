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
  { label: 'Ovins', value: 'Ovins' },
  { label: 'Bovin', value: 'Bovin' },
  { label: 'Volaille', value: 'Volaille' },
];
const bati = [ 
  { label: 'oui', value: true },
  { label: 'non', value: false }
];
const { TextArea } = Input;

class Popup extends React.Component {
  constructor(props){
    super(props);
    this.state = { visible: this.props.visible, typeFoncier: false ,production:"animal"};
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.onChange3=this.onChange3.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.onChange_date=this.onChange_date.bind(this);
    this.onChange_date=this.onChange_date.bind(this);
    this.onChange_date_2=this.onChange_date_2.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
    this.handleChange_value_production=this.handleChange_value_production.bind(this);
    this.onChange_date_exploitation=this.onChange_date_exploitation.bind(this);
    

    
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
    

  }
  
  handleOk = async (e) => {

    
    var valid = true
    await fetch("http://localhost:3001/get_foncier",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id:this.props.user.id,
        
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
    if(responseJson) {
      for(let i = 0;i<responseJson.length;i++){
        if(this.state.nom ===responseJson[i].nom ){
          valid = false
          break;
        }
      }
    }
      
   })

   if(valid) toast.success('Le Nom est valide ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
     else toast.warn('Ce Nom exist deja !! ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
     
     if(!this.state.typeFoncier){
       toast.warn('veulliez choisie le type de foncier !!!  ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
       valid = false
     }
     if(this.state.typeFoncier ==="loué" && (!this.state.date_loue || !this.state.prix_loue)){
       toast.warn('veulliez inserer les information de location!!!  ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
       valid = false
     }
     
     if(this.state.production ==="animal"  && (!this.state.type)){
       toast.warn('Veuillez choisit l\'espèce a élevé.' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
       valid = false
     }




    
    
    
      if(valid){fetch("http://localhost:3001/add_foncier",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        surface:this.props.surface,
        geometry:this.props.last_feature,
        id_exp:this.props.user.id,
        prix_loue:this.state.prix_loue,
        proprietaire:this.state.proprietaire,
        date_loue:this.state.date_loue,
        prix_achat:this.state.prix_achat,
        date_achat:this.state.date_achat,
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{

    toast.success('Le foncier a été bien ajouté à la carte. ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

    fetch("http://localhost:3001/add_exploitation",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        date_exploitation:this.state.date_exploitation,
        id_foncier:responseJson.data,
        batiment:String(this.state.batiment),
        note:this.state.prix_achat,
        errige:this.state.errige,
        culture_permanent:String(this.state.culture_permanent),
        source_eau:String(this.state.source_eau),
        type:this.state.type

      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log("brahim" , responseJson)

     toast.success('L\'exploitation a été bien ajouté . ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});

     if( this.state.prix_loue ){
       console.warn("hello")
      fetch("http://localhost:3001/add_cout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: 'Location',
          type: "COÛT",
          id_exploitation: responseJson.data,
          id_exp:Number(JSON.parse(sessionStorage.getItem('user')).id) ,
          date: this.state.date_loue,
          montant: this.state.prix_loue,
          
        }),
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
          toast.success('le coût est bien ajouté ' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000})
         
          
        });
    }
    } );


    

   })
   
      this.props.update();
     
    this.setState({
      visible: false,
    });}
  }
  
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

  handlechange({target}){
    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 

  handleChange_value(value){
    this.setState({typeFoncier:value})
  }

  handleChange_value_production(value){
    this.setState({production:value})
  }

  onChange_date(date,dateString) {
    console.log(date,dateString);
    this.setState({date_loue:dateString})
  }
  onChange_date_2(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_achat":dateString})
  }
  onChange_date_exploitation(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_exploitation":dateString})
  }


  render() {
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log(this.props.last_feature)
    return (
      <div>
        <Button id="infoAdd"type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title=""
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Nom</p>
          <Input placeholder="Basic usage"  name="nom" value={this.state.nom} onChange={this.handlechange} />
          <br/>

          <p>surface</p>
          <InputGroup className="mb-3">
          <FormControl
            placeholder="surface"
            name="surface"
            value={this.props.surface}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          <InputGroup.Text id="basic-addon2">ha</InputGroup.Text>
        </InputGroup>

        <p>foncier</p>
    <Select name="typeFoncier" defaultValue="possédée" value={(this.state.typeFoncier)}  style={{ width: 120 }} onChange={this.handleChange_value}>
      <Option value="loué">Loué</Option>
      <Option value="possédée">possédée</Option>
    </Select>
        
        <br/>
        <br/>
{/*lpouee*/ }
        {(this.state.typeFoncier ==="loué")? 
       (<div> <p>prix_loue</p>
       
          <InputGroup className="mb-3">
          <FormControl
            placeholder="Recipient's username"
            name="prix_loue"
            type="Number"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handlechange}
          />
          <InputGroup.Text id="basic-addon2">$</InputGroup.Text>
        </InputGroup>

  <p>proprietaire</p>
    <Input  placeholder="proprietaire" name="proprietaire" onChange={this.handlechange} />
    <br/> 
    <br/> 
    <p>Date loue</p>
    <DatePicker onChange={this.onChange_date} /> </div>):(<div></div>)}
    {(this.state.typeFoncier==="possédée") && <div>
       <p>prix_d'achat</p>
       <InputGroup className="mb-3">
       <FormControl
         placeholder="Recipient's username"
         name="prix_achat"
         type="Number"
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       <InputGroup.Text id="basic-addon2">$</InputGroup.Text>
     </InputGroup>
    <p>Date d'achat</p>
    
    <DatePicker onChange={this.onChange_date_2}/>

    </div>}
    {/*lpouee*/ }

    <p>type de production</p>
    <Select defaultValue="animal" style={{ width: 120 }} onChange={this.handleChange_value_production}>
      <Option value="animal">animal</Option>
      <Option value="végétale">végétale</Option>
    </Select>
    {(this.state.production === "animal")&& <>

    <br/>
    <br/>
    <p>à une batiment ?</p>
    <Radio.Group
          options={bati}
          name="batiment"
          onChange={this.handlechange}
          value={this.state.batiment}
          optionType="button"
          buttonStyle="solid"
        />
    <p>Élevage des?</p>
        <Radio.Group
          name="type"
          options={options}
          onChange={this.handlechange}
          value={this.state.type}
          optionType="button"
          buttonStyle="solid"
        />
    </>
    }

{(this.state.production === "végétale")&& <>

<br/>
<br/>
<p>errigée ?</p>
<Radio.Groupdate_loue
      options={bati}
      name="errige"
      onChange={this.handlechange}
      value={this.state.errige}
      optionType="button"
      buttonStyle="solid"
    />

<br/>
<p>culture permanent ?</p>
<Radio.Group
      options={bati}
      name="culture_permanent"
      onChange={this.handlechange}
      value={this.state.culture_permanent}
      optionType="button"
      buttonStyle="solid"
    />

<p>source d'eau ?</p>
<Radio.Group
      options={bati}
      name="source_eau"
      onChange={this.handlechange}
      value={this.state.source_eau}
      optionType="button"
      buttonStyle="solid"
    />
</>
}

<br/>

<p>Date d'exploitation</p>
    <DatePicker onChange={this.onChange_date_exploitation}/>

<p>donner une note sur cette production</p>
    <TextArea rows={2} name="note" onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default Popup