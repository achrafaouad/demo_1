import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Input} from 'antd';
import AddProduit from "./addProduits";
import { format } from 'date-fns';
const { Search } = Input;
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
  }

 class Produits extends Component {
    constructor(props) {
        super(props);
        this.state={path:"getPhyto",addm:false}
        this.onChange = this.onChange.bind(this);
        this.addMat = this.addMat.bind(this);
        

    }


    

      async fetch_data1() {

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
            
            this.setState({data1:this.data}) 
        
           }

           async fetch_data2() {

            this.data = await fetch("http://localhost:3001/getSemence",{
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
                
                this.setState({data2:this.data}) 
            
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

               async fetch_data3() {

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
                    
                    this.setState({data3:this.data}) 
                
                   }

               async fetch_data4() {

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
                    
                    this.setState({data4:this.data}) 
                
                   }

                   async fetch_data5() {

                        
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

                       this.setState({data5:this.data}) 
                      

                       }

    
           componentDidMount(){
            console.log("didmount")
            this.fetch_data1()
            this.fetch_data2()
            this.fetch_data3()
            this.fetch_data4()
            this.fetch_data5()
            this.fetch_data14()
            var oneSecond = 15000;
   
            this.intervalID = setInterval(() => {
                
                this.fetch_data1()
                this.fetch_data2()
                this.fetch_data3()
                this.fetch_data4()
                this.fetch_data5()
                this.fetch_data14()
            }, oneSecond);
         }
   
         componentWillUnmount(){
            clearInterval(this.intervalID);
            
          }

          renderTableData() {
            if(this.state.data1){
                if(this.state.value){
                  return this.state.data1.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { composition, n_enregistrement,nom,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{n_enregistrement}</td>
                     <td>{composition}</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data1.map((student, index) => {
                      
                    const { composition, n_enregistrement,nom,id_prod } = student //destructuring
          
                      return (
                       <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                       <td>{nom}</td>
                       <td>{n_enregistrement}</td>
                       <td>{composition}</td>
                       
                    </tr>
                      )
                   })
                }
           
        }}

    
        renderTableHeader() {
            if(this.state.data1){
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >N° d'Enregistrement</th>
               <th key={3}  >Composition</th>
               </>
               )
            
            }
            
         }
         renderTableDataEngrai() {
            if(this.state.data3){
                if(this.state.value){
                  return this.state.data3.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const {azot,photosphere,potassium,composition_n_oligo_elements, unité,nom,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{unité}</td>
                     <td>{azot}% Azote {photosphere}% Photosphère {composition_n_oligo_elements}% Oligo Aliments {potassium}% Potassium </td>
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data3.map((student, index) => {
                      
                    const {azot,Phosphore,potassium,composition_n_oligo_elements, unité,nom,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{unité}</td>
                     <td>{azot}% Azote {Phosphore}% Phosphore {composition_n_oligo_elements}% Oligo Aliments {potassium}% Potassium </td>
                  </tr>
                    )
                   })
                }
           
        }}

    
        renderTableHeaderEngrai() {
            if(this.state.data3){
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Unité</th>
               <th key={3}  >Composition</th>
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
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
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
         renderTableDataProduitAnimal() {
            if(this.state.data14){
                if(this.state.value){
                  return this.state.data14.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                    const { nom,unité,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{unité}</td>
                     
                  </tr>
                    )
                   })
                }
                else{
                  return this.state.data14.map((student, index) => {
                      
                    const { nom,unité,id_prod } = student //destructuring
          
                    return (
                     <tr key={id_prod} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                     <td>{nom}</td>
                     <td>{unité}</td>
                     
                  </tr>
                    )   
                   })
                }
           
        }}

         renderTableDataRecolte() {
            if(this.state.data4){
                if(this.state.value){
                  return this.state.data4.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
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
                else{
                  return this.state.data4.map((student, index) => {
                      
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

    
        renderTableHeaderRecolte() {
            
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Culture</th>
               <th key={3}  >Unité</th>
               </>
               )
               }
               renderTableHeaderSemence() {
            
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={2}  >Culture</th>
               <th key={3}  >Unité</th>
               </>
               )
            
            
            
         }
               renderTableHeaderProduitAnimal() {
            
               
               return (
                  <>
               <th key={1}  >Nom de Produit</th>
               <th key={3}  >Unité</th>
               </>
               )
            
            
            
         }

         renderTableDataAliment() {
          if(this.state.data5){
              if(this.state.value){
                return this.state.data5.filter((d)=>{if(d.nom) return d.nom.toUpperCase().includes(this.state.value)} ).map((student, index) => {
                  const { nom, date_achat,note,unit, fournisseur,id_aliment } = student //destructuring
        
                  return (
                   <tr key={id_aliment} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                   <td>{nom}</td>
                   <td>{  format(new Date(date_achat), 'dd/MM/yyyy')
                             }</td>
                   <td>{unit}</td>
                   <td>{fournisseur}</td>
                   <td>{note}</td>
                   
                </tr>
                  )
                 })
              }

              else{
                return this.state.data5.map((student, index) => {
                    
                  const { nom, date_achat,note,unit, fournisseur,id_aliment } = student //destructuring
        
                  return (
                   <tr key={id_aliment} onClick ={()=> this.setState({choosen:student , afficher:true})}>
                   <td>{nom}</td>
                   <td>{  format(new Date(date_achat), 'dd/MM/yyyy')
                             }</td>
                   <td>{unit}</td>
                   <td>{fournisseur}</td>
                   <td>{note}</td>
                   
                </tr>
                  )   
                 })
              }
         
      }}

  
      renderTableHeaderAliment() {
          
             
             return (
                <>
             <th key={1}  >Nom de Aliment</th>
             <th key={2}  >date d'achat</th>
             <th key={3}  >Unité</th>
             <th key={4}  >Fournisseur</th>
             <th key={5}  >Note</th>
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



render(){
    console.log("render")
    return(
        <div>
        <div className="row">
          <div className="col-lg-12 grid-margin">
            <div className="card ">
                { (this.state.addm === false) && <>
            <div className="container">
                   <div class="d-flex flex-row-reverse bd-highlight" style={{margin:"10px"}}>
                <button
                visible
                type="button"
                className="btn btn-success btn-sm "
                id="drow_polygone"
                onClick={this.addMat}
              >
                + ajouter un Produit
              </button>
              </div>
            <Tabs defaultActiveKey="1" onChange={callback} style={{color:"#ffff"}}>
                <TabPane tab="PHYTOSANITAIRES" key="1"   >

                <h1 id='title'>PHYTOSANITAIRES</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeader()} </tr>
                        {this.renderTableData()}
                    </tbody>
                    </table>
                        </TabPane>


                <TabPane tab="ENGRAIS" key="2" >
                <h1 id='title'>Engrais</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderEngrai()} </tr>
                        {this.renderTableDataEngrai()}
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
                        <tr>{this.renderTableHeaderSemence()} </tr>
                        {this.renderTableDataSemence()}
                    </tbody>
                    </table>
                </TabPane>
                <TabPane tab="RÉCOLTES" key="4" >

                <h1 id='title'>RÉCOLTES</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderRecolte()} </tr>
                        {this.renderTableDataRecolte()}
                    </tbody>
                    </table>
                </TabPane>

                <TabPane tab="Aliments" key="5" >

                <h1 id='title'>Aliments</h1>

            
                    <div class="d-flex flex-row-reverse bd-highlight">
                    
                    <Search  placeholder="filtrer vos materiels" onChange={this.onChange} style={{ width: 200, marginRight:"30px",marginLeft:"10px" }} />
            
                    </div>
                    <br/>
                    <br/>
                    <table id='students' style={{width:"100%", height: "auto",}}>
                    <tbody>
                        <tr>{this.renderTableHeaderAliment()} </tr>
                        {this.renderTableDataAliment()}
                    </tbody>
                    </table>
                </TabPane>

                <TabPane tab="Produits d'origine animale" key="6" >

                <h1 id='title'>Produits d'origine animale</h1>
            
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


            {(this.state.addm === true) && <AddProduit reafficher={this.addMat}/>}
        </div>
        </div>
        </div>
        </div>

    ) 
}

}


export default Produits 