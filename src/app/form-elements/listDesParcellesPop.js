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

class PopupPArc extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handleCh=this.handleCh.bind(this);
   
    this.getParcelle()

    
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
         this.setState({travaux:this.state.travaux})
         this.forceUpdate()
               }

         
         console.log("state",this.state)

    
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.travaux !== this.state.travaux) {
      console.log('pokemons state has changed.')
      this.props.listofDnem(this.state.travaux)
    }

    if (prevState !== this.state) {
      console.log('pokemons state has changed.')
      this.props.listofDnem(this.state.travaux)
    }

  }
                
      


  

 
  async getParcelle(){
    this.data = await fetch("http://localhost:3001/getExploitationVeg").then(response =>{
        if(response.ok){
          return response.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then(responseJson =>{
          console.log(responseJson)
          return responseJson
          
        })

        this.setState({data:this.data})


  }

  parc(){
      if(this.state.data){
          
        return this.state.data.map((st,index)=>{
            return (<div class="form-check" key={st.nom}>
            <input class="form-check-input" type="checkbox" value={[st.nom,st.id_exploitation]} id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
            {st.nom}
            </label>
            </div>)
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
          title="Ajouter Votre animal"
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


export default PopupPArc