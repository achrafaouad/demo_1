import React from 'react';
import moment from 'moment';
import { Modal, version, Button } from 'antd';
import 'antd/dist/antd.css';
import { BsBriefcaseFill, BsCaretRight } from "react-icons/bs";
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
const gender = [ 
  { label: 'mâle', value: "mâle" },
  { label: 'femelle', value: "femelle" }
];
const { TextArea } = Input;

class  PopupRecolte extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleChange_value=this.handleChange_value.bind(this);
   
    this.hour = 0;

    this.Reacolt()
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    
    
     
      
     
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
 

  
  

  

  handleChange(e){
      console.log(e.target.value)
       
      if(e.target.name === "kg"){
        this.setState({quanitity:e.target.value})
      }
      
      
  }

  handleChange_value(e){
    console.log(e.target.value)
    this.setState({id_recolte:JSON.parse(e.target.value).id_prod})
    this.setState({Nom_produit:JSON.parse(e.target.value).nom})
    if(JSON.parse(e.target.value).quantité) this.setState({quanitityExist:JSON.parse(e.target.value).quantité})
    else this.setState({quanitityExist: 0})
    console.log(JSON.parse(e.target.value).quantité)
    console.log(JSON.parse(e.target.value).id_prod)
  }


  componentDidUpdate(prevProps, prevState) {
  
    if (prevState!== this.state) {
      console.log('pokemons state has changed.')
      this.props.id_recolte(this.state.id_recolte,this.state.Nom_produit)
      this.props.quanitity(this.state.quanitity)
      this.props.SumQRecolt((Number(this.state.quanitityExist)+Number(this.state.quanitity)))

    }
  }
  

  async Reacolt(){
    this.data = await fetch("http://localhost:3001/getRecolte",{
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
         this.setState({Recolt:this.data})
         
    
//     return this.data.map((aliment, index) => {
//         const { id_aliment,nom } = aliment //destructuring
//         return (
//       <option value={id_aliment}>{nom}</option>
//     )
//   })

}





 


  render() {  
    if(this.state.Recolt){
      var lolo = this.state.Recolt.map((e, key) => {
       return <option key={e.id_prod} value={JSON.stringify(e)}>{e.nom}</option>;
       })
   }
    console.log('props', this.state)
    
    console.log(this.props.last_feature)
    return (
      <div>
        <i  onClick={this.showModal} > <BsCaretRight/> </i>
        {/* <Button id="infoAdd"type="primary" onClick={this.showModal}>ajouter des travaux</Button> */}
        <Modal
          title="Ajouter Votre RÉCOLTE"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
     <p>RÉCOLTES</p>
        <select class="custom-select" aria-label="Default select example" onChange={this.handleChange_value}>
        <option defaultValue>choisie Votre Récolte</option>
        
        {lolo}
        
        </select>
        <br/>
        <br/>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Quantité" aria-label="Recipient's username" aria-describedby="basic-addon2" name = "kg" onChange={this.handleChange}/>
  <span class="input-group-text" id="basic-addon2">KG</span>
</div>
            
 
           
             
          
        
       
   

        </Modal>
      </div>
    );
  }
}


export default PopupRecolte