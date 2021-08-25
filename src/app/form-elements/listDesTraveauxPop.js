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

class PopupTrav extends React.Component {
  constructor(props){
    super(props);
    this.state = {travaux:[]};
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
    this.handleCh=this.handleCh.bind(this);
   
    this.onChange_date_naissance=this.onChange_date_naissance.bind(this);
    

    
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

 
 

  handlechange({target}){
    console.log("ello");
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state);
  } 



  handleCh(e){
      
      const isChecked = e.target.checked;
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

      
  
  }

  

  onChange_date_naissance(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_birth":dateString})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.travaux !== this.state.travaux) {
      console.log('pokemons state has changed.')
      this.props.listof(this.state.travaux)
    }
    
    if (prevState !== this.state) {
      console.log('pokemons state has changed.')
      this.props.listof(this.state.travaux)
    }
  }


  render() {
      
    console.log("ha les travau ", this.state)
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

            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Autres travaux" id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
             Autres travaux
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Autres travaux de culture" id="flexCheckChecked" onChange={this.handleCh} />
            <label class="form-check-label" for="flexCheckChecked">
            Autres travaux de culture
            </label>
            </div>
                        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Fertiliser" id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
            Fertiliser
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Moissonner ou Récolter" id="flexCheckChecked" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckChecked">
            Moissonner ou Récolter
            </label>
            </div>
                        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Préparer le sol" id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
            Préparer le sol
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Semer ou Planter" id="flexCheckChecked" onChange={this.handleCh} />
            <label class="form-check-label" for="flexCheckChecked">
            Semer ou Planter    
            </label>
            </div>
                        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Traitement non chimique" id="flexCheckDefault" onChange={this.handleCh}/>
            <label class="form-check-label" for="flexCheckDefault">
            Traitement non chimique
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Traitement phytosanitaire" id="flexCheckChecked" onChange={this.handleCh} />
            <label class="form-check-label" for="flexCheckChecked">
            Traitement phytosanitaire
            </label>
            </div>
             
          
        
       
   

        </Modal>
      </div>
    );
  }
}


export default PopupTrav