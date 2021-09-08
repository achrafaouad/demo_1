import React, { Component } from "react";
import { FaBeer } from 'react-icons/fa';
import 'antd/dist/antd.css';
import { DatePicker, Radio } from "antd";
import { Input} from 'antd';
import NouveauCout from "./NouveauCout";
import { format } from 'date-fns';
const { Search } = Input;









class TableAmortisement extends Component {
    constructor(props) {
      super(props);
      this.state = { addm:false};
      
      this.addMat = this.addMat.bind(this)
    }


    renderTableData() {
        if(this.state.data1){
            if(this.state.value){
              return this.state.data1.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                const { date, type,nomcout,id_prod ,montant,name,année_amortissement} = student //destructuring
      
                return (
                 <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                 <td>{nomcout}</td>
                 <td>{type}</td>
                 <td>{ format(new Date(date), 'dd/MM/yyyy')}</td>
                 <td>{montant}dh</td>
                 <td>{name}</td>
                 <td>{ année_amortissement}</td>
                 
              </tr>
                )
               })
            }
            else{
              return this.state.data1.map((student, index) => {
                  
                const { date, type,nomcout,id_prod ,montant,name,année_amortissement} = student //destructuring
      
                  return (
                   <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                   <td>{nomcout}</td>
                   <td>{type}</td>
                   <td>{ format(new Date(date), 'dd/MM/yyyy')}</td>
                   <td>{montant}dh</td>
                   <td>{name}</td>
                   <td>{ année_amortissement}</td>
                   
                </tr>
                  )
               })
            }
       
    }}


    renderTableHeader() {
        if(this.state.data1){
           
           return (
              <>
           <th key={1}  >Nom</th>
           <th key={2}  >Type</th>
           <th key={3}  >Date</th>
           <th key={4}  >Montant</th>
           <th key={5}  >Impulté a</th>
           <th key={6}  >Amortissement</th>
           </>
           )
        
        }
        
     }
     async fetch_data1() {

        this.data = await fetch("http://localhost:3001/getCout",{
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
            
            this.setState({data1:this.data}) 
        
           }


    componentDidMount(){
        console.log("didmount")
        this.fetch_data1()
        
        var oneSecond = 15000;

        this.intervalID = setInterval(() => {
            
            this.fetch_data1()
            
        }, oneSecond);
     }

     componentWillUnmount(){
        clearInterval(this.intervalID);
        
      }

      addMat(){
        let afficher = this.state.addm?false:true
        this.setState({addm:afficher})
        console.log(this.state)
     }




 render(){





    return(
        <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card ">
        

            
                    {(this.state.addm === false) && <>

                        <h1 id='title'>Coûts fixes</h1>
                        <div className="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
                        <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />

                        <button
                        visible
                        type="button"
                        className="btn btn-success btn-sm "
                        id="drow_polygone"
                        onClick={this.addMat}
                    >
                        + NOUVEAU COÛT
                    </button>

                    </div>
                    
                     
                    
            
                    
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeader()} </tr>
                        {this.renderTableData()}
                    </tbody>
                    </table>


                    </>
                    }



      {(this.state.addm === true) && <NouveauCout reafficher={this.addMat}/>}
        
        
      </div>
        </div>
        </div>
        </div>

        )
 }
    


}


export default TableAmortisement;