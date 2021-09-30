import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import AddMouvement from "./addMouvement";
import { FilteringTable } from "./FilteringTable";
import Scroll from "../basic-ui/Scroll";
import ReactHTMLTableToExcel from "react-html-table-to-excel"
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

 class Stock extends Component {
    constructor(props) {
        super(props);
        this.state={path:"getPhyto",addm:false , data:[]}
        this.onChange = this.onChange.bind(this);
        this.addMat = this.addMat.bind(this);
        

    }


    

      async fetch_data1() {

        this.data1 = await fetch("http://localhost:3001/getPhyto",{
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
            
             
        

            this.data2 = await fetch("http://localhost:3001/getSemence",{
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
                
                

                this.data3 = await fetch("http://localhost:3001/getEngrais",{
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
                    
                    this.setState({data:[...this.data1 , ...this.data2,...this.data3]})  
                
                   }
                   async fetch_data14() {

                    this.data = await fetch("http://localhost:3001/getProduit12",{
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
                        
                        this.setState({data14:this.data}) 
                    
                       }

               async fetch_dataHistorique() {

                this.data = await fetch("http://localhost:3001/historique",{
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
                    
                    this.setState({data144:this.data})  
                
                   }

               async fetch_dataRecolt() {

                this.data = await fetch("http://localhost:3001/getRecolte",{
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
                    
                    this.setState({data_recolt:this.data})  
                
                   }

               async fetch_dataAliment() {

                this.data = await fetch("http://localhost:3001/get_aliment1",{
                          method:'POST',
                          headers:{'Content-Type':"application/json"},
                          body:JSON.stringify({
                            id_exp:JSON.parse(sessionStorage.getItem('user')).id 
                          })
                     }).then(response =>{
                       if(response.ok){
                         return response.json();
                       }
                       throw new Error('request failed');}, networkError => console.log(networkError))
                       .then(responseJson =>{
                        return responseJson
                       })
                    
                    this.setState({data6:this.data})  
                
                   }

    
           componentDidMount(){
            console.log("didmount")
            this.fetch_data1()
            this.fetch_dataRecolt()
            this.fetch_dataHistorique()
            this.fetch_dataAliment()
            this.fetch_data14()


            var oneSecond = 40000;
   
            this.intervalID = setInterval(() => {
                
                this.fetch_data1()
                this.fetch_dataRecolt()
                this.fetch_dataHistorique()
                this.fetch_dataAliment()
                this.fetch_data14()
               
            }, oneSecond);
         }
   
         componentWillUnmount(){
            clearInterval(this.intervalID);
            
          }

          renderTableData() {
            if(this.state.data){
                if(this.state.value){
                  return this.state.data.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { quantité, unité,nom,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{quantité} {unité}</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data.map((student, index) => {
                      
                    const { quantité, unité,nom,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{quantité} {unité}</td>
                     
                  </tr>
                    )
                   })
                }
           
        }}

    
        renderTableHeader() {
            if(this.state.data){
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Quantité</th>
               </>
               )
            
            }
            
         }
         renderTableDataRecolt() {
            if(this.state.data_recolt){
                if(this.state.value){
                  return this.state.data_recolt.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { nom , culture, quantité,prix_uni,unité,id_prod  } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{culture}</td>
                     <td>{quantité} {unité}</td>
                     <td>{prix_uni} dh</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data_recolt.map((student, index) => {
                      
                    const { nom , culture, quantité,prix_uni,unité,id_prod  } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{culture}</td>
                     <td>{quantité} {unité}</td>
                     <td>{prix_uni} dh</td>
                     
                  </tr>
                    )
                   })
                }
           
        }}

    
        renderTableHeaderRecolt() {
            if(this.state.data_recolt){
               
               return (
                  <>
               <th key={1}  >Nom</th>
               <th key={2}  >culture</th>
               <th key={3}  > quantité</th>
               <th key={4}  >prix unitaire</th>
               </>
               )
            
            }
            
         }

         renderTableDataSemence() {
            if(this.state.data2){
                if(this.state.value){
                  return this.state.data2.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { nom, culture,unité,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod + nom} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{culture}</td>
                     <td>{unité}</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data2.map((student, index) => {
                      
                    const { nom, culture,unité,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{culture}</td>
                     <td>{unité}</td>
                     
                  </tr>
                    )   
                   })
                }
           
        }}

    
        renderTableHeaderSemence() {
            if(this.state.data3){
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Culture</th>
               <th key={3}  >Unité</th>
               </>
               )
            
            }
            
         }
         renderTableDataAliment() {
            if(this.state.data6){
                if(this.state.value){
                  return this.state.data6.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { nom, fournisseur,unit,id_aliment,quantite } = student //destructuring
          
                    return (
                     <tr key={id_aliment + nom} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{quantite}</td>
                     <td>{unit}</td>
                     <td>{fournisseur}</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data6.map((student, index) => {
                      
                    const { nom, fournisseur,unit,id_aliment,quantite } = student //destructuring
          
                    return (
                     <tr key={id_aliment + nom} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{quantite} </td>
                     <td>{unit}</td>
                     <td>{fournisseur}</td>
                  </tr>
                    )  
                   })
                }
           
        }}

    
        renderTableHeaderAliment() {
            
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Quantité</th>
               <th key={3}  >Unité</th>
               <th key={3}  >Fournisseur</th>
               </>
               )
            
            
            
         }

         onChange(e){

            this.setState({value:e.target.value.toUpperCase()})
            console.log(e.target.value)
        }

    

          handleChange(e){
              console.log(e)
              console.log("chlaylay")
          }

          addMat(){
            let afficher = this.state.addm?false:true
            this.setState({addm:afficher})
            console.log(this.state)
         }

         renderTableHeaderProduitAnimal() {
            
               
          return (
             <>
          <th key={1}  >Nom de Produit</th>
          <th key={3}  >Unité</th>
          </>
          )
       
       
       
    }

    renderTableDataProduitAnimal() {
      if(this.state.data14){
          if(this.state.value){
            return this.state.data14.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
              const { nom,quantité,unité,id_prod } = student //destructuring
    
              return (
               <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
               <td>{nom}</td>
               <td>{quantité} {unité}</td>
               
            </tr>
              )
             })
          }
          else{
            return this.state.data14.map((student, index) => {
                
              const { nom,unité,quantité,id_prod } = student //destructuring
    
              return (
               <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
               <td>{nom}</td>
               <td>{quantité} {unité}</td>
               
            </tr>
              )   
             })
          }
     
  }}





render(){
    console.log("render")
    return(
        <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card " style={{minHeight: '100vh',
      maxHeight: "100hv"}}>
                { (this.state.addm === false) && <><div style={{padding:"15px"}}>
                   <div class="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
                <button
                visible
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un Mouvement de Stock
              </button>
              </div>
            <Tabs defaultActiveKey="1" onChange={callback} style={{color:"#ffff" , width:'100%'}}>
                <TabPane tab="stock des Produits" key="1"   >

                <h1 id='title'>stock des Produits</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    <ReactHTMLTableToExcel className="btn btn-info" table="students2"  filename="Produits" sheet="Sheet" buttonText="Export to Excel"/>
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students2' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeader()} </tr>
                        {this.renderTableData()}
                    </tbody>
                    </table>
                        </TabPane>
                
                        <TabPane tab="Mouvement de stock" key="3"   >

              <h1 id='title'>Mouvement de stock</h1>


                <div class="d-flex flex-row-reverse bd-highlight">
                </div>
                <br/>
                <br/>
                { (this.state.data144) && <Scroll>
                   
                <FilteringTable datadnem = {this.state.data144}/>
                   
                 </Scroll>
                 }
                    </TabPane>


                <TabPane tab="stock des Récoltes" key="2" >
                <h1 id='title'>stock des Récoltes</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    <ReactHTMLTableToExcel className="btn btn-info" table="students1"  filename="Récoltes" sheet="Sheet" buttonText="Export to Excel"/>
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students1' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderRecolt()} </tr>
                        {this.renderTableDataRecolt()}
                    </tbody>
                    </table>
                </TabPane>
            
           

                <TabPane tab="stock des Aliments" key="4" >
                <h1 id='title'>stock des Aliments</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    <ReactHTMLTableToExcel className="btn btn-info" table="students3"  filename="Aliments" sheet="Sheet" buttonText="Export to Excel"/>

                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students3' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderAliment()} </tr>
                        {this.renderTableDataAliment()}
                    </tbody>
                    </table>
                </TabPane>
                <TabPane tab="stock des produits d'origine animale" key="6" >

                <h1 id='title'>produits d'origine animale</h1>
            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderProduitAnimal()} </tr>
                        {this.renderTableDataProduitAnimal()}
                    </tbody>
                    </table>
                </TabPane>
            
            </Tabs>
            </div> </>}


           {(this.state.addm === true) && <AddMouvement reafficher={this.addMat}/>} 
        </div>
        </div>
        </div>
        </div>

    ) 
}

}


export default Stock 