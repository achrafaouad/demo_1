import React, { Component } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { Select } from 'antd';
import { Input} from 'antd';
import 'antd/dist/antd.css';
import AddTracteur from './add_tracteur';
import Scroll from "./Scroll";
import CardList from "./CardList";
import AddPersonnel from "./addPersonnel";
import PersonnelPage from "./personnelPage";
const { Search } = Input;

const { Option } = Select;
export class Personnel extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { name:'',addm:false, afficher_card:false ,value:''}
    this.fetch_data()
 this.provinceData = [];
 this.onChange = this.onChange.bind(this);
 this.addMat = this.addMat.bind(this);
 this.ON_afficherList = this.ON_afficherList.bind(this);
 this.choosen = this.choosen.bind(this);
 
};

   async fetch_data() {

   this.data = await fetch("http://localhost:3001/getPers_saisonnier").then(response2 =>{
      if(response2.ok){
        return response2.json();
      }
      throw new Error('request failed');}, networkError => console.log(networkError))
      .then( responseJson2 =>{
        return responseJson2

       })

       this.data2 = await fetch("http://localhost:3001/getPers_permanent").then(response2 =>{
        if(response2.ok){
          return response2.json();
        }
        throw new Error('request failed');}, networkError => console.log(networkError))
        .then( responseJson2 =>{
          return responseJson2
  
         })
         

         var newArray = this.data.concat(this.data2);
       this.setState({data:newArray}) 
   
      }

      componentDidMount(){
         console.log("didmount")
         const oneSecond = 10000;

         this.intervalID = setInterval(() => {
             this.fetch_data()
            
         }, oneSecond);
      }

      componentWillUnmount(){
         clearInterval(this.intervalID);
         
       }

       choosen(val){
         console.log("ha li 3welty" ,val);
         this.setState({choosen:val})
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
             <button
                visible
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un personnel
              </button>
             </div>
             <br/>
             <br/>

           

    {!data ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1' style={{color:"#ffff"}}>Personnel</h1>
          <Scroll>
            <CardList materiels={filteredRobots} ON_afficherList={this.ON_afficherList} ON_choosen ={this.choosen} />
          </Scroll>
        </div>
      )}


            
            </>
  }
   { ( this.state.afficher_card === true) &&<>
    <PersonnelPage exploitation={this.state.choosen} retour={this.ON_afficherList}/>
   </>
   }



              {(this.state.addm === true) && <AddPersonnel reafficher={this.addMat}/>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Personnel;
