import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Input} from 'antd';
const { Search } = Input;

class Travail extends Component {
    constructor(props) {
        super(props);
        this.state={path:"getPhyto",addm:false}
        this.onChange = this.onChange.bind(this)
    }



    async fetch_data() {

        this.data = await fetch("http://localhost:3001/getTravail").then(response2 =>{
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
        
         }
   
         


          renderTableData() {
            if(this.state.data){
                if(this.state.value){
                  return this.state.data.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { type, id_trav,nom,} = student //destructuring
          
                    return (
                     <tr key={id_trav} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{type}</td>
                     
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data.map((student, index) => {
                      
                    const { type, id_trav,nom,} = student //destructuring
          
                    return (
                     <tr key={id_trav} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{type}</td>
                     
                     
                  </tr>
                    )
                   })
                }
           
        }}


        renderTableHeader() {
            if(this.state.data){
               
               return (
                  <>
               <th key={1}  >Nom de Travail</th>
               <th key={2}  >Type</th>
               </>
               )
            
            }
            
         }
        onChange(e){

            this.setState({value:e.target.value.toUpperCase()})
            console.log(e.target.value)
        }

          render(){
              return(
                <div>
                <div className="row">
                  <div className="col-lg-12 grid-margin">
                    <div className="card " style={{minHeight: '100vh',
      maxHeight: "100hv"}}>
                    
              <h1 id='title'>Travaux</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos travaux" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />

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
              )
          }
        }

        export default Travail