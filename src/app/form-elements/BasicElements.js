import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import Scroll from '../basic-ui/Scroll';
import { BasicTable } from './BasicTable';
import { SortingTable } from './SortingTable';
import { FilteringTable } from './FilteringTable';
import NouvelleOperation from './NouvelleOperation';


export class BasicElements extends Component {
  constructor(props){
    super(props);
    this.state={startDate: new Date(),
      addm:false,}
      this.addMat = this.addMat.bind(this);
      this.fetching ()
  }


  async fetching (){
  
    await fetch("http://localhost:3001/getOperation")
              .then(
                (response) => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error("request failed");
                },
                (networkError) => console.log(networkError)
              )
              .then((responseJson) => {
                     this.setState({data144:responseJson})
                     console.log(responseJson)
        
          })
      
  }
  
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount() {
    bsCustomFileInput.init()
  }

  renderTableHeader() {
   
       
       return (
          <>
       
       <th key={0}  ></th>
       <th key={1}  >id_exploitation</th>
       <th key={2}  >Date</th>
       <th key={3}  >Exploitation</th>
       <th key={4}  >Surface travaillée</th>
       <th key={5}  >Travaux</th>
       <th key={6}  >Durée de l’opération</th>
       <th key={7}  >Produits </th>
       <th key={8}> Opérateurs</th>
       <th key={9}> Matériels</th>
       <th key={9}> Notes</th>
       </>
       )
    
 }
 addMat(){
  let afficher = this.state.addm?false:true
  this.setState({addm:afficher})
  console.log(this.state)
}

  render() {
    console.log(" ha ;l 9lawe ",this.state.data144 )
    return (
          
      
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Horizontal Two column</h4>
                {/* <Scroll>
                <table id='students' style={{width:"100%", height: "auto",}}>
               <tbody>
                   <tr>{this.renderTableHeader()}</tr>

                </tbody>
                </table> 
                </Scroll>
                <BasicTable/> */}
                 
                 {/* <SortingTable/> */}

                 {(this.state.addm === false && this.state.data144) && <><button
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un personnel
              </button>
                 <Scroll>
                   
                 <FilteringTable datadnem = {this.state.data144}/>
                   
                 </Scroll> </>
                 
                 }
                 {(this.state.addm === true) && <><NouvelleOperation/> </>}
              </div>
            </div>
          </div>
        
    )
  }
}

export default BasicElements
