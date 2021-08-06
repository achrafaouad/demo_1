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
  
  handleOk = (e) => {
    
    
      fetch("http://localhost:3001/add_foncier",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        surface:this.props.surface,
        geometry:this.props.last_feature,
        id_exp:4,
        //this.props.user.id,
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
    fetch("http://localhost:3001/add_exploitation",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        nom:this.state.nom,
        date_exploitation:this.state.date_exploitation,
        id_foncier:responseJson.data,
        batiment:String(this.state.batiment),
        note:this.state.prix_achat,
        culture_permanent:String(this.state.culture_permanent),
        source_eau:String(this.state.source_eau)

      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{console.log(responseJson)} );

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
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Nom</p>
          <Input placeholder="Basic usage" name="nom" value={this.state.nom} onChange={this.handlechange} />
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
    </>
    }

{(this.state.production === "végétale")&& <>

<br/>
<br/>
<p>errigée ?</p>
<Radio.Group
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

        <br />
        <br />
        <Radio.Group
          options={options}
          onChange={this.onChange3}
          value={value3}
          optionType="button"
          buttonStyle="solid"
        />
   

        </Modal>
      </div>
    );
  }
}


export default Popup