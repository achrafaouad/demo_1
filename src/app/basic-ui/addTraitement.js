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

class AddTraitement extends React.Component {
  constructor(props){
    super(props);
    this.state = { visible: this.props.visible, typeFoncier: false ,production:"animal"};
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
   
    this.onChange_date_traitement=this.onChange_date_traitement.bind(this);
    
    this.optionAliment()
    console.log(this.state)
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }


  
  handleOk = (e) => {
    
    
      fetch("http://localhost:3001/effectuer_traitement",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_trait:this.state.id_trait ,
        id_ann:this.props.id,
        date_traitement:this.state.date_traitement,
        note:this.state.note,
        numero_bulletin:this.state.numero_bulletin,
        veterinaire:this.state.veterinaire,
        cout:this.state.cout
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     console.log(responseJson)
     toast.success('Le traitement a été bien effectuer avec succès' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
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
    this.data = await fetch("http://localhost:3001/get_traitement",{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
        id_exp:JSON.parse(sessionStorage.getItem('user')).id 
      }),
      }).then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2

         })
         this.setState({traitement:this.data})
         
    
//     return this.data.map((aliment, index) => {
//         const { id_aliment,nom } = aliment //destructuring
//         return (
//       <option value={id_aliment}>{nom}</option>
//     )
//   })

}

  

onChange_date_traitement(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_traitement":dateString})
    
  }


  handleChange_value(e){
      console.log(e.target.value)
      this.setState({id_trait:JSON.parse(e.target.value).id_trait})
      console.log("ha state",this.state)
  }


  render() {
      if(this.state.traitement){
       var lolo = this.state.traitement.map((e, key) => {
        return <option key={e.id_trait} value={JSON.stringify(e)}>{e.operation}</option>;
        })
    }
    
    console.log('props', this.props)
    console.log('render', this.state)
    console.log(this.props.last_feature)
    return (
      <div>
        <button type="button"  class="btn btn-warning btn-lg btn-block" onClick={this.showModal}>Ajouter un traitement</button>
        <Modal
          title="Ajouter un Traitement"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
          
          
        <p>traitement</p>
        <select class="custom-select" aria-label="Default select example" onChange={this.handleChange_value}>
        <option defaultValue>choisie Votre traitement</option>
        
        {lolo}
        
        </select>
        <br/>
          
    
       <p>Coût de traitement </p>
       <InputGroup className="mb-3">
       <FormControl
         type="Number"
         name="cout"
         onChange={this.handlechange}
         placeholder="cout de traitement"
         value={this.state.prix_unit}
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
       />
       <InputGroup.Text id="basic-addon2">dh</InputGroup.Text>
     </InputGroup>

     <p>Vétérinaire</p>
       <InputGroup className="mb-3">
       <FormControl
         type="text"
         placeholder="veterinaire"
         name="veterinaire"
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
     </InputGroup>

     <p>Numero de Bulletin</p>
       <InputGroup className="mb-3">
       <FormControl
         type="text"
         placeholder="Numero de Bulletin"
         name="numero_bulletin"
         aria-label="Recipient's username"
         aria-describedby="basic-addon2"
         onChange={this.handlechange}
       />
     </InputGroup>
    

<p>Date de traitement</p>
    <DatePicker onChange={this.onChange_date_traitement}/>


<p>Cause/Note</p>
    <TextArea rows={2} name="note" onChange={this.handlechange} />

   

        </Modal>
      </div>
    );
  }
}


export default AddTraitement