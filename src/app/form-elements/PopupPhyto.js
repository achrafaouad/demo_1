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

class PopupPhyto extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[] , Values:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handleCh=this.handleCh.bind(this);
    this.handleValue=this.handleValue.bind(this);
   
    this.fetch_data()

    
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
 

  
  handleCh(e){
      const isChecked = e.target.checked;
      console.log(isChecked , e.target.value )
      if(isChecked){
          this.setState({travaux:[...this.state.travaux,e.target.value]})
          this.forceUpdate()
      }
      else{
          const index = this.state.travaux.indexOf(e.target.value);
          this.state.travaux.splice(index, 1)
          this.state.Values.splice(index,1)

         this.setState({travaux:this.state.travaux})
         this.setState({Values:this.state.Values})
         this.forceUpdate()
               }

         
         console.log("state",this.state)

    
  }

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  handleValue(){

    let { Values, input } = this.state;
    Values.push(input);

  }

  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.travaux !== this.state.travaux) {
      console.log('pokemons state has changed.')
      this.props.ListPhyto(this.state.travaux)
      this.props.ListValuesPhyto(this.state.Values)
    }

    if (prevState !== this.state) {
      console.log('pokemons state has changed.')
      this.props.ListPhyto(this.state.travaux)
      this.props.ListValuesPhyto(this.state.Values)
    }
  }
  

 
  async fetch_data() {

    this.data1 = await fetch("http://localhost:3001/getPhyto",{
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
 
    
        
        
        this.setState({data:this.data1})
    
       }

  parc(){
      if(this.state.data){
          
        return this.state.data.map((st,index)=>{
            return (<div class="form-check">
            <input key={st.azot} class="form-check-input" type="checkbox" value={[st.nom,st.prix_uni,st.id_prod,st.quantité]} id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
            {st.nom}
            </label>
            <div class="input-group mb-3">
            <input key={st.nom} type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" name = {st.nom} onChange={this.saveInput}/>
            <span class="input-group-text" id="basic-addon2">{st.unité}</span>
            </div>
            <button key={st.unité} onClick={this.handleValue}> Add Item </button>
            </div>
            )
            
          })
      }
  }


  render() {  
    const {  value3 } = this.state;
    console.log('props', this.state)
    
    console.log(this.props.last_feature)
    return (
      <div>
        <i  onClick={this.showModal} > <BsCaretRight/> </i>
        {/* <Button id="infoAdd"type="primary" onClick={this.showModal}>ajouter des travaux</Button> */}
        <Modal
          title="Ajouter Votre Phytosantaire"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >

       {this.parc()}
            
           
             
          
        
       
   

        </Modal>
      </div>
    );
  }
}


export default PopupPhyto
