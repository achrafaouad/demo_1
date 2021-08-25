import React, { Component } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Select } from 'antd';
import { Input} from 'antd';
import 'antd/dist/antd.css';
import AddTracteur from './add_tracteur';
import Scroll from "./Scroll";
import CardList from "./CardList";
import MaterielPage from "./MaterielPage";
const { Search } = Input;

const { Option } = Select;
export class Dropdowns extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'',addm:false ,value:'', afficher_card:false}
    this.fetch_data()
 this.provinceData = [];
 this.onChange = this.onChange.bind(this);
 this.addMat = this.addMat.bind(this);
 this.ON_afficherList = this.ON_afficherList.bind(this);
 this.choosen = this.choosen.bind(this);
};

   async fetch_data() {

   this.data = await fetch("http://localhost:3001/getMateriel").then(response2 =>{
      if(response2.ok){
        return response2.json();
      }
      throw new Error('request failed');}, networkError => console.log(networkError))
      .then( responseJson2 =>{
        return responseJson2

       })

       
       
       this.setState({data:this.data})
   
      }

      componentDidMount(){
         console.log("didmount")
         const oneSecond = 5000;

         this.intervalID = setInterval(() => {
             this.fetch_data()
            
         }, oneSecond);
      }

      componentWillUnmount(){
         clearInterval(this.intervalID);
         
       }


      onChange(e){

          this.setState({value:e.target.value})
          console.log(e.target.value)
      }
      addMat(){
         let afficher = this.state.addm?false:true
         this.setState({addm:afficher})
         console.log(this.state)
      }
      ON_afficherList(){
        let afficher_card1 = this.state.afficher_card?false:true
         this.setState({afficher_card:afficher_card1})
         console.log(this.state)
      }
      choosen(val){
        console.log("ha li 3welty" ,val);
        this.setState({choosen:val})
      }

      
  render() {
   const { data, value } = this.state;
   let filteredRobots
   if(data){
         filteredRobots = data.filter(d =>{
         return d.nom.toLowerCase().includes(value.toLowerCase());
   })
}

   
     console.log("render",this.state)
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card">

            <br/>

            { (this.state.addm === false && this.state.afficher_card === false) &&<>
            <div class="d-flex flex-row-reverse bd-highlight">
            
             <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
             =
             <button
                visible
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un materiel
              </button>
             </div>
             <br/>
             <br/>

           

    {!data ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1' style={{color:"#ffff"}}>Materiels</h1>
          <Scroll>
            <CardList materiels={filteredRobots} ON_afficherList={this.ON_afficherList} ON_choosen ={this.choosen}/>
          </Scroll>
        </div>
      )}


            
            </>
  }
   { ( this.state.afficher_card === true) &&<>
    <MaterielPage exploitation={this.state.choosen} retour={this.ON_afficherList}/>
   </>
   }



              {(this.state.addm === true) && <AddTracteur reafficher={this.addMat}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dropdowns;
