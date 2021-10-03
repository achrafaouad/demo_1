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
import { BsFillTrashFill } from "react-icons/bs";

toast.configure();

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

class DeleteFromProfil extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    if(this.props.choosen) this.setState({choosen:this.props.choosen})
    
    
    this.handleOk=this.handleOk.bind(this);
    this.handleCancel=this.handleCancel.bind(this);
    this.showModal=this.showModal.bind(this);
    this.handlechange=this.handlechange.bind(this);
   
    this.onChange_date_naissance=this.onChange_date_naissance.bind(this);
    this.onChange_date_achat=this.onChange_date_achat.bind(this);
    

    
  }
 
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    
     if(this.props.type === 'Prodanimal') var url = "/deleteExpAnn"
     if(this.props.type === 'animal') var url = "/deleteAnn"
     if(this.props.type === 'Prodveg') var url = "/deleteProdveg"

      fetch("http://localhost:3001"+url,{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({
            id_foncier:this.props.choosen.id_foncier,
            id_ann:this.props.choosen.id_ann,
      })
 }).then(response =>{
   if(response.ok){
     return response.json();
   }
   throw new Error('request failed');}, networkError => console.log(networkError))
   .then(responseJson =>{
     
    toast.success('La supression a été effectué avec succès' ,{position:toast.POSITION.TOP_RIGHT , autoClose:8000});
    this.props.retour()
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

  

  onChange_date_naissance(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_birth":dateString})
  }
  onChange_date_achat(date,dateString) {
    console.log(date,dateString);
    this.setState({"date_achat":dateString})
  }
  


  render() {
    console.error(this.props.choosen)
    return (
      <div>
        <button type="button"  class="btn btn-danger btn-lg btn-block" onClick={this.showModal}><BsFillTrashFill/></button>
        <Modal
          title="suprimer cette production?"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div style={{textAlign:'center'}}>
          <img
                 style={{width:"100px", height: "auto", borderRadius: "10px" }}
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mKgwySGPrSGAC62f-NHB1RTzg5uWRW31Jg&usqp=CAU"
                alt=" hello"/>

            {(this.props.choosen )&& <> <p>vous voulez vraiment suprimer</p> {this.props.choosen.nom} ? </>}
          </div>
        </Modal>
      </div>
    );
  }
}


export default DeleteFromProfil