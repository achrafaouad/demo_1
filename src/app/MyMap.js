import React, { Component } from "react";
import OlMap from "ol/Map";
import ReactDOM from 'react-dom';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import scscaleline from "ol/control/ScaleLine";
import fullscreen from "ol/control/FullScreen";
import OlSourcexyz from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
import olVectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { BsBoundingBoxCircles ,BsXCircle} from "react-icons/bs";
import { transform } from "ol/proj.js";
import "ol/ol.css";
import xyz from "ol/source/XYZ";
import { AiOutlineRollback,AiOutlineCheck } from "react-icons/ai";
import Zoom from "ol/control/Zoom";
import ZoomSlider from "ol/control/ZoomSlider";
import OverviewMap from "ol/control/OverviewMap";
import Popup from "./popup.js";
import GeoJSON from "ol/format/GeoJSON";
import  AutoComplete  from "./AutoComplete.js";
import Pov from "./Pov.js";
import Filter from "./Filter.js";
import zIndex from "@material-ui/core/styles/zIndex";


const popupText = (coordinate , selected) => {
  if (!coordinate) return "";
  if(selected){
    if("source_eau" in selected) return  "<h3>"+selected.nom+"</h3> <p>Exploitation végétale</p> <p> surface: "+ Math.round(selected.surface)+" ha</p>";
  return  "<h3>"+selected.nom+"</h3> <p>Exploitation animale("+selected.type+ ")</p> <p> surface: "+ Math.round(selected.surface)+" ha</p>";
  }
  
};
const NotSelected = new Style({
  stroke: new Stroke({
    color: 'black',

    width: 1,

    lineDash: [4, 8]
  }),

  fill: new Fill({
    color: "rgba(0,0,0,.6)",
  }),
})

const veg =  new Style({
  stroke: new Stroke({
     color: 'black',

    width: 1,

     lineDash: [4, 8]
  }),

  fill: new Fill({
    color: 'rgba(127, 255, 0,0.63 )',
  }),
})



const Animal = new Style({
  stroke: new Stroke({
    color: 'black',

    width: 1,

     lineDash: [4, 8]
  }),

  fill: new Fill({
    color: "#ffc078",
  }),
})

class PublicMap extends Component {
  constructor(props) {
    super(props);
    //baseMaps

    this.arcgisMap = new OlLayerTile({
      source: new OlSourcexyz({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 15,
        minZoom: 5,
      }),
    });

    this.google = new OlLayerTile({
      source: new xyz({
        url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
      }),
    });

    this.state = {
      center: [-777823.1998299537, 3502650.384139917],
      zoom: 5,
      source: new VectorSource({ wrapX: false }),
      classname: false,
      last_feature: "",
      surface: 0,
      visible: false,
      baseMap: this.arcgisMap,
      map_name: "",
      travaux:["Exploitation Vegetale", "Exploitation animale"]
     
    };
    

    this.vector = new olVectorLayer({
      source: this.state.source,
      updateWhileInteracting: true,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2,
        }),
      }),
    });

    this.draw = "";

    this.olmap = new OlMap({
      target: null,
      controls: [
        new scscaleline(),
        new fullscreen(),
        new Zoom(),
        new ZoomSlider(),
        new OverviewMap(),
      ],
      layers: [this.state.baseMap, this.vector],

      view: new OlView({
        center: this.state.center,
        zoom: this.state.zoom,
        minZoom: 2,
      }),
    });

    

  

    this.mediumLow = new VectorSource();
    this.mediumLowAnnsrc = new VectorSource();

    this.mediumLowVector = new olVectorLayer({
      title: "medium low Risk",

      source: this.mediumLow,

      style:veg,
    });

    this.mediumLowAnn = new olVectorLayer({
      title: "medium low Risk",

      source: this.mediumLowAnnsrc,

      style: Animal ,
    });
    this.format = new GeoJSON();

    this.changeBaseMap = this.changeBaseMap.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
    this.coordinate = this.coordinate.bind(this);
    this.close = this.close.bind(this);
    this.serchValue = this.serchValue.bind(this);  
    this.handleCh  = this.handleCh.bind(this);  
    console.log(this.props);
  }

  changeBaseMap = (e) => {
    console.log(this.olmap.getLayers().getArray()[0]);
    console.log("nemmi choof mn l map ",e.target.id);
    if (e.target.id === "Esri map") {
      this.setState({ map_name: "Esri map" });
      this.olmap.getLayers().getArray()[0] = this.arcgisMap;
    } else {
      this.olmap.getLayers().getArray()[0] = this.google;
      this.setState({ map_name: "google" });
    }
  };

  serchValue = (e)=>{
    this.setState({serchValue:e})
    JSON.parse(sessionStorage.getItem('parcels')).every((item , index) => {
      console.log("hello",[JSON.parse(item.geometryjson).coordinates[0][0][0],JSON.parse(item.geometryjson).coordinates[0][0][1]])
      if(item.nom.toLowerCase().includes(e.toLowerCase())){
        this.CenterMap1(JSON.parse(item.geometryjson).coordinates[0][0][0],JSON.parse(item.geometryjson).coordinates[0][0][1])
        
        return false
      }
      return true
    })
  }

  updateMap() {
    console.log("update_map");
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  async fetch_data(){
     await fetch("http://localhost:3001/get_foncier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: JSON.parse(sessionStorage.getItem('user')).id,
      }),
    })
      .then(
        (response2) => {
          if (response2.ok) {
            return response2.json();
          }
          throw new Error("request failed");
        },
        (networkError) => console.log(networkError)
      )
      .then((responseJson2) => {
        console.log(responseJson2);
        console.log("ha les pqrcel");
        
        sessionStorage.setItem('parcels',JSON.stringify(responseJson2))
      });
    
    this.forceUpdate();
    console.log("hello nemmi")
    
  }

   componentDidMount() {
    console.log("hello world ha l map rje3t");
    this.olmap.setTarget("map");

    this.olOverlay = new Overlay({
      element: document.getElementById("popup"),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    this.olmap.addOverlay(this.olOverlay);

    document.getElementById("closePop").addEventListener("click", (e)=>{
      
      document.getElementById("popup").style.visibility = "hidden"
    })
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });


    

    //drawing polygon

    document.getElementById("drow_polygone").addEventListener("click", () => {
      document.getElementById("undo").style.visibility = "visible";
      document.getElementById("submit_par").style.visibility = "visible";
      this.setState({ classname: true });
      this.olmap.removeInteraction(this.draw);
      this.addInteraction();

      // this.draw.on("drawend", (e) => {
      //   this.setState({visible:true})
      //   this.forceUpdate()
      // });
    });

    //fetching

    
    const oneSecond = 2000;

         this.intervalID = setInterval(() => {
             this.fetch_data()
             if(JSON.parse(sessionStorage.getItem('parcels'))){
               //todo
               console.warn("hello")
          if(!this.state.travaux.includes("Exploitation animale")){
        
          this.mediumLowAnn.setStyle(
            NotSelected
          )
        }
         if(!this.state.travaux.includes("Exploitation Vegetale")){
        
          this.mediumLowVector.setStyle(
            NotSelected
          )
        }
         if(this.state.travaux.includes("Exploitation Vegetale")){
        
          this.mediumLowVector.setStyle(
            veg
          )
        }
         if(this.state.travaux.includes("Exploitation animale")){
        
          this.mediumLowAnn.setStyle(
            Animal
          )
        }

               //todo


             let Longeur =  JSON.parse(sessionStorage.getItem('parcels')).length
             if( Longeur != Number(sessionStorage.getItem('indice'))){
               console.log("beforing",this.mediumLow.getFeatures())
                this.mediumLow.clear();
                this.mediumLowAnnsrc.clear();
                
                JSON.parse(sessionStorage.getItem('parcels')).forEach((item) => {
                  if("batiment" in item && this.state.travaux.includes("Exploitation animale")){  
                  this.mediumLowAnnsrc.addFeatures(
                    this.format.readFeatures(item.geometryjson, { featureProjection: "EPSG:3857" })
                  );}
                  else if(this.state.travaux.includes("Exploitation Vegetale")) { 
                  this.mediumLow.addFeatures(
                    this.format.readFeatures(item.geometryjson, { featureProjection: "EPSG:3857" })
                  );
                }
                
             
                
                })
                  
                 

              
              sessionStorage.setItem('indice',Longeur)
             }
            }
            
         }, oneSecond);

    document.getElementById("submit_par").addEventListener("click", () => {
      this.olmap.removeInteraction(this.draw);
    });

    //nemmi

   

    if(JSON.parse(sessionStorage.getItem('parcels'))){
      let i =0
    JSON.parse(sessionStorage.getItem('parcels')).forEach((item) => {
      // let jsonData = JSON.parse(geometryjson)
      // jsonData["crs"] = {"type":"name","properties":{"name":"EPSG:3857"}}
      

      if("batiment" in item && this.state.travaux.includes("Exploitation animale")){  
                  this.mediumLowAnnsrc.addFeatures(
                    this.format.readFeatures(item.geometryjson, { featureProjection: "EPSG:3857" })
                  );}
                  else if(this.state.travaux.includes("Exploitation Vegetale")){  
                  this.mediumLow.addFeatures(
                    this.format.readFeatures(item.geometryjson, { featureProjection: "EPSG:3857" })
                  );}
       
        // else if(!this.state.travaux.includes("Exploitation Vegetale") && this.state.travaux.includes("Exploitation animale")){
        //   this.mediumLowAnn.clear();
        // }



      console.log("lmm",i++);
      sessionStorage.setItem('indice',i)
      console.log("Lmm",this.state)

      console.log(
        this.format.readFeature(item.geometryjson, { featureProjection: "EPSG:3857" })
      );
    });

    

    this.olmap.on("click", (e) => {
      this.olmap.forEachFeatureAtPixel(e.pixel, (feature, Layer) => {
        for (var i = 0; i < JSON.parse(sessionStorage.getItem('parcels')).length; i++) {
          if (
            JSON.stringify(
              JSON.parse(JSON.parse(sessionStorage.getItem('parcels'))[i].geometryjson).coordinates
            ) ===
            JSON.stringify(
              JSON.parse(this.format.writeGeometry(feature.getGeometry()))
                .coordinates
            )
          ) {

            console.log(JSON.parse(sessionStorage.getItem('parcels'))[i]);
            const coordinate = e.coordinate
            console.log(coordinate)
           this.setState({popupCoord:coordinate}) 
           if (this.state.popupCoord && this.olOverlay){ this.olOverlay.setPosition(coordinate) ; document.getElementById("popup").style.visibility = "visible"; this.setState({selected:JSON.parse(sessionStorage.getItem('parcels'))[i]})}
           else if (this.olOverlay) this.olOverlay.setPosition(null);
           
         
            
          }
        }
      });
    });
  }

    this.olmap.addLayer(this.mediumLowVector);
    this.olmap.addLayer(this.mediumLowAnn);

    document.getElementById("undo").addEventListener("click", () => {
      if (this.draw) {
        this.draw.removeLastPoint();
      }
    });
  }
  componentWillUnmount(){
    clearInterval(this.intervalID);
    
  }

  


  //add interaction

  addInteraction() {
    this.draw = new Draw({
      source: this.state.source,
      type: "Polygon",
    });
    document.getElementById("undo").style.visibility = "visible";

    this.olmap.addInteraction(this.draw);
    this.updateMap(); // Update map on render?
    this.state.source.on("addfeature", (evt) => {
      var feature = evt.feature;

      var coords = feature.getGeometry();

      var Features = this.format.writeGeometry(coords);
      Features = JSON.parse(Features);
      Features["crs"] = { type: "name", properties: { name: "EPSG:3857" } };
      Features = JSON.stringify(Features);
      this.last_feature = Features;
      //console.log(feature.getGeometry().Area())
      console.log(feature.getGeometry().getArea());
      this.surface = feature.getGeometry().getArea() / 10000;
      this.setState({ surface: this.surface, last_feature: this.last_feature });
      this.forceUpdate();
      console.log("hana", this.last_feature);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    let layer = "";
    let my_new = nextState.map_name;
    console.log(layer, my_new);
    if (
      center === nextState.center &&
      zoom === nextState.zoom &&
      layer === my_new
    )
      return false;

    return true;
  }

  CenterMap(long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    //this.olmap.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    //this.olmap.getView().setZoom(15);
    this.flyTo(
      transform([long, lat], "EPSG:4326", "EPSG:3857"),
      function () {}
    );
  }
  CenterMap1(long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    //this.olmap.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    //this.olmap.getView().setZoom(15);
    this.flyTo1(
      [long, lat],
      function () {}
    );
  }
  coordinate(long, lat) {
    this.CenterMap(long, lat);
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
        
        zoom: zoom>5? zoom + 1 :zoom+4,
      
        duration: duration / 2,
      },
      callback
    );
    console.error(zoom)
  }
  flyTo1(location, done) {
    const duration = 1500;
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
        
        zoom: zoom>8? zoom + 1 :zoom+8,
      
        duration: duration / 2,
      },
      callback
    );
    console.error(zoom)
  }


  close(){
    this.setState({popupCoord:""})
    this.forceUpdate()
  }

  handleCh(e){
      
    const isChecked = e.target.checked;
    if(isChecked){
        this.setState({travaux:[...this.state.travaux,e.target.value]})
        this.forceUpdate()
    }
    else{
        const index = this.state.travaux.indexOf(e.target.value);
        this.state.travaux.splice(index, 1)
       this.setState({travaux:this.state.travaux})
       this.forceUpdate()
       
             }

    

}



  render() {
    console.log("state of render ", this.state);
    return (
      <>
      <div
        id="map"
        className="grid-margin"
        style={{ width: "100%", minHeight: '100vh' , maxHeight:"150vh"  }}
      >
        <div
          className="d-flex flex-column bd-highlight mb-3"
          style={{ position: "absolute", marginLeft: "35px", zIndex: 1 }}
        >
          <div className="d-flex flex-row bd-highlight add_polygone">
            <div className="p-2 bd-highlight">
              {(this.state.last_feature)&&
              <Popup
                user={JSON.parse(sessionStorage.getItem('user'))}
                last_feature={this.state.last_feature}
                surface={this.state.surface}
                update={() => {
                  this.setState({ done: true });
                }}
              />}
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-danger  btn-sm "
                type="button"
                id="submit_par"
                style={{ visibility: "hidden"  , backgroundColor:"rgba(255, 37, 0,0.8)"}}
              >
                <BsXCircle/>
              </button>
            </div>
            <div className="p-2 bd-highlight">
              <button
                
                type="button"
                className="btn btn-sm"
                id="drow_polygone"
                style={{backgroundColor:"rgba(48, 95, 153,0.63)"}}
              >
                <BsBoundingBoxCircles/>
              </button>
            </div>

            <div className="p-2 bd-highlight">
              <button
                className="btn btn-warning btn-sm"
                type="button"
                id="undo"
                style={{ visibility: "hidden" , backgroundColor:"rgba(250, 176, 5,0.8)" }}
              >
                <AiOutlineRollback/>  
              </button>
            </div>

            <div className="p-2 bd-highlight">
            <AutoComplete coordinate={this.coordinate} />
            </div>
          </div>

          <div className="d-flex flex-row bd-highlight add_polygone">
          <div className="p-2 bd-highlight"><Pov changeBaseMap={this.changeBaseMap}/></div>
          <div className="p-2 bd-highlight"> <Filter serchValue={this.serchValue} handleCh={this.handleCh}/></div>
            
          </div>

        </div>
      </div>

      <div id="popup" class="ol-popup">
        <button class="ol-popup-closer btn btn-danger" id="closePop"/>
        <div  dangerouslySetInnerHTML={{ __html: popupText(this.state.popupCoord , this.state.selected) }} style={{textAlign:"center"}} />
      </div>
      
      </>
    );
  }
}

export default PublicMap;
