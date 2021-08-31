import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import 'antd/dist/antd.css';
import { format } from 'date-fns';
import { Tabs,Input } from 'antd';
import PopupModifierPr from './PopupModifierPr';
import PopupMatMod from './PopupMatMod';
import PopupSemece from './PopupSemece';
import PopupUpdatePhyt from './PopupUpdatePhyt';
import PopupUpdateEngrais from './PopupUpdateEngrais';

const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
  console.log(key);
}

export class BasicTable extends Component {

  constructor(props){
    super(props);
    this.state = {}
    this.onChange = this.onChange.bind(this);
  }

  async fetch_data_OPÉRATEURS() {

    this.data = await fetch("http://localhost:3001/getPersonnel1",{
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
        
        this.setState({data_personnel:this.data}) 
    
       }
       async fetch_data_MATÉRIELS() {

        this.data = await fetch("http://localhost:3001/getmat144",{
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
            
            this.setState({data_mat:this.data}) 
        
           }


           async fetch_data_SEMENCES_PLANTS() {

            this.data =await fetch("http://localhost:3001/getSemence",{
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
                
                this.setState({semence:this.data}) 
            
               }
               async fetch_data_PHYTOSANITAIRES() {

                this.data = await fetch("http://localhost:3001/getPhyto",{
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
                    
                    this.setState({phyto:this.data}) 
                
                   }

               async fetch_data_ENGRAIS() {

                this.data = await fetch("http://localhost:3001/getEngrais",{
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
                    
                    this.setState({ENGRAIS:this.data}) 
                
                   }
    

                   componentDidMount(){
                    console.log("didmount")
                    this.fetch_data_OPÉRATEURS()
                    this.fetch_data_MATÉRIELS()
                    this.fetch_data_SEMENCES_PLANTS()
                    this.fetch_data_PHYTOSANITAIRES()
                    this.fetch_data_ENGRAIS()
                    
                    var oneSecond = 40000;
           
                    this.intervalID = setInterval(() => {
                      this.fetch_data_OPÉRATEURS()
                      this.fetch_data_MATÉRIELS()
                      this.fetch_data_SEMENCES_PLANTS()
                      this.fetch_data_PHYTOSANITAIRES()
                      this.fetch_data_ENGRAIS()
                       
                       
                    }, oneSecond);
                 }

                 onChange(e){

                  this.setState({value:e.target.value.toUpperCase()})
                  console.log(e.target.value)
              }
           
                 componentWillUnmount(){
                    clearInterval(this.intervalID);
                    
                  }
        
                  renderTableData_personnel() {
                    if(this.state.data_personnel){
                        if(this.state.value){
                          return this.state.data_personnel.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                            const { nom,id_pers,salaire_hr,VALIDE_DEPUIS } = student //destructuring
                  
                              return (
                               <tr key={id_pers} >
                               <td>{nom}</td>
                               <td>{salaire_hr} dh/h</td>
                               <td> {  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             } </td>
                               <td><PopupModifierPr choosen={student}/></td>


                               
                               
                            </tr>
                              )
                           })
                        }
                        else{
                          return this.state.data_personnel.map((student, index) => {
                              
                            const { nom,id_pers,salaire_hr,VALIDE_DEPUIS } = student //destructuring
                  
                              return (
                               <tr key={id_pers} >
                               <td>{nom}</td>
                               <td>{salaire_hr} dh/h</td>
                               <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                               <td><PopupModifierPr choosen={student}/></td>
                               
                               
                            </tr>
                              )
                           })
                        }
                   
                }}

                renderTableHeader_personnel() {
                  
                     
                     return (
                        <>
                     <th key={1}  >OPÉRATEURS</th>
                     <th key={2}  >PRIX</th>
                     <th key={3}  >VALIDE DEPUIS LE:</th>
                     <th key={4}  >Modifer</th>
                     </>
                     )
                  
                  
                  
               }


                  renderTableData_MATÉRIELS() {
                    if(this.state.data_mat){
                        if(this.state.value){
                          return this.state.data_mat.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                            const { nom,id_mat,prix_hr,VALIDE_DEPUIS } = student //destructuring
                  
                            return (
                             <tr key={id_mat} onClick ={()=> this.setState({choosen:student })}>
                             <td>{nom}</td>
                             <td>{prix_hr} dh/h</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td>{<PopupMatMod choosen={student}/>}</td>
                             
                             
                          </tr>
                            )
                           })
                        }
                        else{
                          return this.state.data_mat.map((student, index) => {
                              
                            const { nom,id_mat,prix_hr,VALIDE_DEPUIS } = student //destructuring
                  
                            return (
                             <tr key={id_mat} onClick ={()=> this.setState({choosen:student })}>
                             <td>{nom}</td>
                             <td>{prix_hr} dh/h</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td>{<PopupMatMod choosen={student}/>}</td>
                             
                             
                          </tr>
                            )
                           })
                        }
                   
                }}

                renderTableHeader_MATÉRIELS() {
                  
                     
                     return (
                        <>
                     <th key={1}  >MATÉRIELS</th>
                     <th key={2}  >PRIX</th>
                     <th key={3}  >VALIDE DEPUIS LE</th>
                     <th key={4}  >Modifer</th>
                     </>
                     )
                  
                  
                  
               }
                  renderTableData_SEMENCES_PLANTS() {
                    if(this.state.semence){
                        if(this.state.value){
                          return this.state.semence.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student })}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupSemece choosen={student}/></td>
                             
                             
                          </tr>
                            )
                           })
                        }
                        else{
                          return this.state.semence.map((student, index) => {
                              
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student })}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupSemece choosen={student}/></td>
                             
                             
                          </tr>
                            )
                           })
                        }
                   
                }}

                renderTableHeader_SEMENCES_PLANTS() {
                  
                     
                     return (
                        <>
                     <th key={1}  >SEMENCES/PLANTS </th>
                     <th key={2}  >PRIX</th>
                     <th key={3}  >VALIDE DEPUIS LE </th>
                     <th key={4}  >Modifer</th>
                     </>
                     )
                  
                  
                  
               }
                  renderTableData_PHYTOSANITAIRES() {
                    if(this.state.phyto){
                        if(this.state.value){
                          return this.state.phyto.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupUpdatePhyt choosen={student}/></td>

                             
                             
                          </tr>
                            )
                           })
                        }
                        else{
                          return this.state.phyto.map((student, index) => {
                              
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupUpdatePhyt choosen={student}/></td>
                             
                             
                          </tr>
                            )
                           })
                        }
                   
                }}

                renderTableHeader_PHYTOSANITAIRES() {
                  
                     
                     return (
                        <>
                     <th key={1}  >PHYTOSANITAIRES </th>
                     <th key={2}  >PRIX</th>
                     <th key={3}  >VALIDE DEPUIS  LE </th>
                     <th key={4}  >Modifer</th>
                     </>
                     )
                  
                  
                  
               }

                  renderTableData_ENGRAIS() {
                    if(this.state.ENGRAIS){
                        if(this.state.value){
                          return this.state.ENGRAIS.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupUpdateEngrais choosen={student}/></td>
                             
                             
                          </tr>
                            )
                           })
                        }
                        else{
                          return this.state.ENGRAIS.map((student, index) => {
                              
                            const { nom,id_prod,prix_uni,VALIDE_DEPUIS,unité } = student //destructuring
                  
                            return (
                             <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                             <td>{nom}</td>
                             <td>{prix_uni} dh/{unité}</td>
                             <td>{  format(new Date(VALIDE_DEPUIS), 'dd/MM/yyyy')
                             }</td>
                             <td><PopupUpdateEngrais choosen={student}/></td>
                             
                             
                          </tr>
                            )
                           })
                        }
                   
                }}

                renderTableHeader_ENGRAIS() {
                  
                     
                     return (
                        <>
                     <th key={1}  >PHYTOSANITAIRES </th>
                     <th key={2}  >PRIX</th>
                     <th key={3}  >VALIDE DEPUIS  LE </th>
                     <th key={4}  >Modifer</th>
                     </>
                     )
                  
                  
                  
               }




  render() {
    return (
      <div>
        <div className="page-header">
          
          <nav aria-label="breadcrumb">
            
          </nav>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Basic Table</h4>
                <p className="card-description"> Add className <code>.table</code>
                </p>
                <div className="table-responsive">
                <Tabs defaultActiveKey="1" onChange={callback} style={{color:"#ffff"}}>
                <TabPane tab="OPÉRATEURS" key="1"   >

                <h1 id='title'>OPÉRATEURS</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                         <tr>{this.renderTableHeader_personnel()} </tr>
                        {this.renderTableData_personnel()}
                    </tbody>
                    </table>
                        </TabPane>


                <TabPane tab="MATÉRIELS" key="2" >
                <h1 id='title'>MATÉRIELS</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeader_MATÉRIELS()} </tr>
                        {this.renderTableData_MATÉRIELS()} 
                    </tbody>
                    </table>
                </TabPane>
                <TabPane tab="SEMENCES/PLANTS" key="3" >

                <h1 id='title'>SEMENCES/PLANTS</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                         <tr>{this.renderTableHeader_SEMENCES_PLANTS()} </tr>
                        {this.renderTableData_SEMENCES_PLANTS()} 
                    </tbody>
                    </table>
                </TabPane>
                <TabPane tab="PHYTOSANITAIRES" key="4" >

                <h1 id='title'>PHYTOSANITAIRES</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                         <tr>{this.renderTableHeader_PHYTOSANITAIRES()} </tr>
                        {this.renderTableData_PHYTOSANITAIRES()}
                    </tbody>
                    </table>
                </TabPane>
                <TabPane tab="ENGRAIS" key="5" >

                <h1 id='title'>ENGRAIS</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                         <tr>{this.renderTableHeader_ENGRAIS()} </tr>
                        {this.renderTableData_ENGRAIS()}
                    </tbody>
                    </table>
                </TabPane>
            </Tabs>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          
          
    )
  }
}

export default BasicTable
