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
import TileSource from 'ol/source/Tile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const { Option } = Select;

const gender = [ 
  { label: 'mâle', value: "mâle" },
  { label: 'femelle', value: "femelle" }
];
const { TextArea } = Input;

class Alimantation extends React.Component {
  constructor(props){
    super(props);
    this.state = { visible: this.props.visible, typeFoncier: false ,production:"animal"};
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
   
    this.onChange_date_alimentation=this.onChange_date_alimentation.bind(this);
    this.onChange_date_fin=this.onChange_date_fin.bind(this);
    
    this.optionAliment()
    console.log(this.state)
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    
      fetch("http://localhost:3001/add_alimentation",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
            id_aliment:this.state.id_aliment,
            quantité:this.state.quantité,
            id_exploitation:this.props.id,
            note:this.state.note,
            duré:this.state.duré,
            date_alimentation:this.state.date_alimentation,
            price:this.state.price,
            currentStock:this.state.currentStock,
            nom:this.state.nom,
            id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
    toast.success('L\'alimentation a été ajouté avec succès' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
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

 


  async optionAliment(){
    this.data = await fetch("http://localhost:3001/get_aliment1",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      })
 }).then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2

         })
         this.setState({aliment:this.data})
         
    
//     return this.data.map((aliment, index) => {
//         const { id_aliment,nom } = aliment //destructuring
//         return (
//       <option value={id_aliment}>{nom}</option>
//     )
//   })

}

  

  onChange_date_alimentation(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_alimentation":dateString})
    
  }
  onChange_date_fin(date,dateString) {
    console.log(date,dateString);

    const a = new Date(this.state.date_alimentation),
    b = new Date(dateString)
    var timeDiff = Math.abs(b.getTime() - a.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    this.setState ({duré:diffDays})
    this.setState({price:(diffDays*this.state.prix_unit*this.state.quantité)})
  }
 

  handleChange_value(e){
      console.log(e.target.value)
      this.setState({id_aliment:JSON.parse(e.target.value).id_aliment,unit:JSON.parse(e.target.value).unit,prix_unit:JSON.parse(e.target.value).prix_unit ,currentStock:JSON.parse(e.target.value).quantite,nom:JSON.parse(e.target.value).nom})
  }


  render() {
    
      if(this.state.aliment){
       var lolo = this.state.aliment.map((e, key) => {
        return <option key={e.id_aliment} value={JSON.stringify(e)}>{e.nom}</option>;
        })
    }
    
    const {  value3 } = this.state;
    console.log('props', this.props)
    console.log('render', this.state)
    console.log(this.props.last_feature)
    return (
      <div>
        
        <button type="button" class="btn btn-warning btn-lg btn-block" onClick={this.showModal}>Ajouter une alimentation</button>

        <Modal
          title="Ajouter une alimentation"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
          
          
        <p>Aliment</p>
        <select class="custom-select" aria-label="Default select example" onChange={this.handleChange_value}>
        <option defaultValue>choisie Votre Aliment</option>
        
        {lolo}
        
        </select>
        <br/>
        <br/>
          
    <p>Qauntité par jour</p>
       <InputGroup className="mb-3">
       <FormControl
         type="Number"
         placeholder="prix d'achat"
         name="quantité"
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       <InputGroup.Text id="basic-addon2">{this.state.unit}</InputGroup.Text>
     </InputGroup>
    
       <p>Prix d'achat par {this.state.unit}</p>
       <InputGroup className="mb-3">
       <FormControl
         type="Number"
         placeholder="prix d'achat"
         value={this.state.prix_unit}
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
       />
       <InputGroup.Text id="basic-addon2">dh</InputGroup.Text>
     </InputGroup>

     <p>Total a payer en dh</p>
       <InputGroup className="mb-3">
       <FormControl
         type="Number"
         placeholder="prix d'achat"
         name="prix"
         value={this.state.price}
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
       <InputGroup.Text id="basic-addon2">dh</InputGroup.Text>
     </InputGroup>
    

<p>Date de debut de ce regime</p>
    <DatePicker onChange={this.onChange_date_alimentation}/>

<p>Date de fin de ce regime</p>
    <DatePicker onChange={this.onChange_date_fin}/>


<p>Note</p>
    <TextArea rows={2} name="note" onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default Alimantation