import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input} from 'antd';
import PopupNewTraitment from "./addNewtraitement";
const { Search } = Input;

class Travail extends Component {
    constructor(props) {
        super(props);
        this.state={path:"getPhyto",addm:false}
        this.onChange = this.onChange.bind(this)
    }



    async fetch_data() {

        this.data = await fetch("http://localhost:3001/get_traitement",{
            method:'POST',
            headers:{'Content-Type':"application/json"},
            body:JSON.stringify({
              id_exp:this.state.id_exp
            })
       }).then(response2 =>{
           if(response2.ok){
             return response2.json();
           }
           throw new Error('request failed');}, networkError => console.log(networkError))
           .then( responseJson2 =>{
             return responseJson2
            })
            
            this.setState({data:this.data}) 
            console.log("data")
        
           }


           componentDidMount(){
            console.log("didmount")
            this.fetch_data()
            var oneSecond = 40000;
   
            this.intervalID = setInterval(() => {
                
                this.fetch_data()
               
            }, oneSecond);
         }
   
         componentWillUnmount(){
            clearInterval(this.intervalID);
            
          }
   
         


          renderTableData() {
            if(this.state.data){
                if(this.state.value){
                  return this.state.data.filter((d)=>{if(d.operation) return d.operation.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { id_trait, operation} = student //destructuring
          
                    return (
                     <tr key={id_trait} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{id_trait}</td>
                     <td>{operation}</td>
                     
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data.map((student, index) => {
                      
                    const { id_trait, operation} = student //destructuring
          
                    return (
                     <tr key={id_trait} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{id_trait}</td>
                     <td>{operation}</td>
                     
                     
                  </tr>
                    )
                   })
                }
           
        }}




        renderTableHeader() {
            if(this.state.data){
               
               return (
                  <>
               <th key={1}  >id</th>
               <th key={2}  >Nom de l'operation</th>
               </>
               )
            
            }
            
         }
        onChange(e){

            this.setState({value:e.target.value.toUpperCase()})
            console.log(e.target.value)
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
                    
                   <div style={{padding:"15px"}}>
                   <div class="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
                
              </div>


              <h1 id='title'>Traitements</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px",marginRight:"10px" }} />
                    <PopupNewTraitment/>
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeader()} </tr>
                        {this.renderTableData()}
                    </tbody>
                    </table>
                        
                        
                        
                        </div>
                

               
                        </div>
                        </div>
                        </div>
                        </div>
              )
          }
        }

        export default Travail