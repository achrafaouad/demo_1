import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import scscaleline from 'ol/control/ScaleLine';
import fullscreen from 'ol/control/FullScreen';
import OlSourcexyz from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import VectorSource from 'ol/source/Vector';
import olVectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Autocomplete from "react-google-autocomplete";
import {transform} from 'ol/proj.js';
import "ol/ol.css";
import Zoom from "ol/control/Zoom"
import ZoomSlider from 'ol/control/ZoomSlider';
import OverviewMap from 'ol/control/OverviewMap';
import Popup from './popup.js'

import Button from 'react-bootstrap/Button';
import GeoJSON from 'ol/format/GeoJSON';
import Layer from "ol/layer/Layer";
class PublicMap extends Component {

  constructor(props) {
    super(props);
     

    this.state = { center: [-777823.1998299537, 3502650.384139917], zoom: 5 , source : new VectorSource({wrapX: false}), classname: false, last_feature: {}, surface: 0 , visible:false};
    
    this.vector = new olVectorLayer({
      source: this.state.source,
      updateWhileInteracting: true,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        })
      })
    });
     

    this.draw = '';


    this.olmap = new OlMap({
      target: null,
      controls:[new scscaleline(),new fullscreen(),new Zoom(),new ZoomSlider(),new OverviewMap()],
      layers: [
      new OlLayerTile({
        source: new OlSourcexyz({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        })
      }),
      this.vector
      ],

      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom,
        minZoom:2
      })
    });
    this.format = new GeoJSON();

  

    this.handleSelect = this.handleSelect.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
    console.log(this.props)
  }

 
  handleSelect(){

  }

  updateMap() {
    console.log("update_map")
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  forceUpdateHandler(){
    this.forceUpdate();
  };

  async componentDidMount() {

  
    console.log("hello world ha l map")
    this.olmap.setTarget("map");

    //fetching
    const geometrys = await fetch("http://localhost:3001/get_foncier",{
          method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({
          id:this.props.userInfo.user.id})
   }).then(response2 =>{
     if(response2.ok){
       return response2.json();
     }
     throw new Error('request failed');}, networkError => console.log(networkError))
     .then( responseJson2 =>{console.log(responseJson2);
     console.log("ha les pqrcel");
      return responseJson2;  
      this.setState({parcels:geometrys});
      this.forceUpdate()     
      })
      
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });

    document.getElementById('submit_par').addEventListener('click',()=>
    {
      this.olmap.removeInteraction(this.draw);
    })
    //drawing polygon
    document.getElementById('drow_polygone').addEventListener('click' ,() => 
    {
    document.getElementById('undo').style.visibility="visible";
    document.getElementById('submit_par').style.visibility="visible";
    this.setState({classname:true})
    this.olmap.removeInteraction(this.draw);
    this.addInteraction();
    
  
    // this.draw.on("drawend", (e) => {
    //   this.setState({visible:true})
    //   this.forceUpdate()
    // });

  })
  //nemmi

  this.mediumLow = new VectorSource();
  this.mediumLowVector = new olVectorLayer({

    title: 'medium low Risk',

    source:this.mediumLow,

    style: new Style({

      stroke: new Stroke({

        // color: symbolLineColor,

        width: 1,

        // lineDash: [4, 8]

      }),

      fill: new Fill({

        color: '#FFC100'

      })

    })

  });
   this.state.parcels.forEach(({ geometry }) => {
    let jsonData = JSON.stringify(geometry)
    //jsonData["crs"] = {"type":"name","properties":{"name":"EPSG:3857"}}
     //console.log(geometry),
     this.mediumLow.addFeatures(this.format.readFeatures(geometry,{ featureProjection: 'EPSG:3857' }))
     console.log(this.format.readFeatures(geometry,{ featureProjection: 'EPSG:3857' }))
     
   }
     )
     this.olmap.addLayer(this.mediumLowVector);
    
   this.forceUpdate()
   this.olmap.on('click',(e)=>{
     this.olmap.forEachFeatureAtPixel(e.pixel, (feature,Layer)=>{
       console.log(feature.getKeys())
       
       console.log(Layer)

     })
   })
      document.getElementById('undo').addEventListener('click', () => {
        if(this.draw){this.draw.removeLastPoint()}});
  }
  
  addInteraction() {

    
      this.draw = new Draw({
        source: this.state.source,
        type: 'Polygon',
        
      });
      document.getElementById('undo').style.visibility="visible";
      

    this.olmap.addInteraction(this.draw);
    this.updateMap(); // Update map on render?
    this.state.source.on('addfeature',(evt) =>{
      var feature = evt.feature;
      
      var coords = feature.getGeometry();
      
       
       var Features= this.format.writeGeometry(coords);
       this.last_feature = Features
      //console.log(feature.getGeometry().Area())
      console.log(feature.getGeometry().getArea())
      this.surface=(feature.getGeometry().getArea())/10000;
      this.setState({surface:this.surface,last_feature:this.last_feature})
      this.forceUpdate()
      console.log("hana" ,this.last_feature)

  });
    
    }
  


  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
     return true;
  }

  CenterMap(long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    //this.olmap.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    //this.olmap.getView().setZoom(15);
    this.flyTo(transform([long, lat], 'EPSG:4326', 'EPSG:3857'),  function () {});
  }

flyTo(location, done) {
  const duration = 2000;
  const zoom = this.olmap.getView().getZoom();
  let parts = 2;
  let called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  this.olmap.getView().animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  this.olmap.getView().animate(
    {
      zoom: zoom - 1,
      duration: duration / 2,
    },
    {
      zoom: zoom+1,
      duration: duration / 2,
    },
    callback
  );
}

  render() {
   console.log('state of render ', this.state)
    return (
      <div>
      <div className='d-flex justify-content-center'>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end  add_polygone grid-margin">
       

       <Popup user ={this.props.user} last_feature={this.state.last_feature} surface ={this.state.surface} visible={this.state.visible}/>
      
        <button className="btn btn-warning me-md-2 "  type="button" id="submit_par" style={{ visibility:"hidden" }} >submit</button>
        <button visible type="button" className="btn btn-success btn-fw " id="drow_polygone">
        + Add polygone

        </button>
        <button className="btn btn-danger me-md-2 "  type="button" id="undo" style={{ visibility:"hidden" }} >undo</button>
        </div>

        <div className="input-group p-2 bd-highlight " style={{ width: "30%", height: "auto",margin:'20px' }} >
         <Autocomplete
         className="input-group flex-nowrap my_input"
        style={{ width: "100%" }}
        onPlaceSelected={(place) => {
          console.log(
            "Places",
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
          this.CenterMap(place.geometry.location.lng(), place.geometry.location.lat());
          
        }}
        types={["(regions)"]}
        componentRestrictions={{ country: "ma" }}
      />
      </div>
      </div>

        <div id="map" className='grid-margin' style={{ width: "100%", height: "auto" }}> </div>
      
        </div>
    );
  }
}

export default PublicMap;
