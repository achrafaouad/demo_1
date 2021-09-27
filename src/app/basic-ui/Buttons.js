import React, { Component } from 'react';
import EditProfil from "./editProfil";
import ChangerMotPass from "./changerMotPass";
import TileSource from 'ol/source/Tile';
class Buttons extends Component {
  constructor(props) {
    super(props);
    console.log("hello", this.props)
    
    
      console.log("mn uttons",this.props.userInfo)
      const {id} = JSON.parse(sessionStorage.getItem('user'));
      this.state={afficher:false,afficherPass:false,id:id}
      console.log(this.state)

    
    
    
    
    this.handleClick=this.handleClick.bind(this);
    this.handleClickPass=this.handleClickPass.bind(this);
    this.reAfficher=this.reAfficher.bind(this);
    this.afficherPass=this.afficherPass.bind(this);
    
    console.log("webbi",this.props.userInfo)
    console.log(this.state)
    
  }

  handleClick(){
    this.setState({afficher:this.state.afficher === false?true:false}) 
    
  }
  handleClickPass(){
    this.setState({afficherPass:this.state.afficherPass === false?true:false})
  }



  async fetch_data() {

    this.data = await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: JSON.parse(sessionStorage.getItem('user')).id,
      }),
    }).then(response2 =>{
       if(response2.ok){
         return response2.json();
       }
       throw new Error('request failed');}, networkError => console.log(networkError))
       .then( responseJson2 =>{
         return responseJson2
 
        })
        
        this.setState({user:this.data[0]}) 
    
       }

       componentDidMount(){
        console.log("didmount")
        const oneSecond = 1000;

        this.intervalID = setInterval(() => {
            this.fetch_data()
           
        }, oneSecond);
     } 
  componentWillUnmount(){
    clearInterval(this.intervalID);
    
  }

  reAfficher(){
    var aff = this.state.afficher?false:true;
    this.setState({afficher:aff})
  }
  afficherPass(){
    var aff = this.state.afficherPass?false:true;
    this.setState({afficherPass:aff})
  }


  
  render () {
    console.log("button",this.state)
    let myPhoto

    if(this.state.user){if(this.state.user.photo){
      myPhoto = this.state.user.photo
    }
    else myPhoto = "uploads/1628505205753.jpg"}
    return (
      <>

      { (this.state.user) &&  <div>
        
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card" style={{height:'auto'}}>
            <div className="card-body">
            <div class="container" id='profil' style={{height:"auto" , color:"#ffff"}}>
          <div class="row"  style={{alignItems:"center"}}>
            <div class="col-sm"  style={{display: "flex" , justifyContent: "center"}}>
              <div>
              <img
                className=" shadow"
                 
                style={{ width:"150px", height: "auto",clipPath:"ellipse(40% 40%)" }}
                  src={"http://localhost:3001/"+ myPhoto } 
                alt=" hello"
              />
              <div className='namePro'>
                {this.state.user.nom}
              </div>
              </div>
            </div>
            <div class="col-sm" style={{padding:"12px"}}>
              
              <div>
                <strong>CIN </strong> :{this.state.user.cin}
              </div>
              <div>
                <strong>Adresse </strong> : {this.state.user.adress}
              </div>
              <div>
                <strong>Devise </strong> : {this.state.user.devise}
              </div>
            </div>
            <div class="col-sm" style={{padding:"12px"}}>
              <div>
                <strong> Ville</strong> : {this.state.user.ville}
              </div>
              <div>
                <strong>Pays </strong> : {this.state.user.pays}
              </div>
              <div>
                <strong>code Insee </strong> : {this.state.user.code_insee}
              </div>
              
            </div>
            <div class="col-sm" style={{padding:"12px"}}>
            <button type="button" class="btn btn-success btn-sm" style={{marginBottom:"12px"}} onClick={this.handleClickPass}>Changer le mot de passe</button><br/>
            </div>
          </div>
        </div>
        <div  >
            A propos : {this.state.user.description}
        </div>

        <div>

          <button type="button" class="btn btn-primary btn-sm btn-block " style={{width:"100%" , boxShadow:'5px 3px 2px 1px rgba(0, 0, 0, .3)'}} onClick={this.handleClick}>Modifier mon profil</button>
        </div>
        {console.error("hana",)}
        { this.state.afficher && <EditProfil Edit = {this.state.user} reAfficher ={this.reAfficher}/>}
        {(this.state.afficherPass && this.state.afficher=== false) && <ChangerMotPass user = {this.state.user} afficherPass ={this.afficherPass}/>}
             
              </div>
            </div>
          </div>
          
          
          
          
        </div>
      </div> }
      </>
    );
  }
}

export default Buttons;