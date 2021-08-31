import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import scscaleline from "ol/control/ScaleLine";
import fullscreen from "ol/control/FullScreen";
import OlSourcexyz from "ol/source/XYZ";
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import olVectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

import { transform } from "ol/proj.js";
import "ol/ol.css";
import xyz from "ol/source/XYZ";

import Zoom from "ol/control/Zoom";
import ZoomSlider from "ol/control/ZoomSlider";
import OverviewMap from "ol/control/OverviewMap";
import Popup from "./popup.js";
import GeoJSON from "ol/format/GeoJSON";
import  AutoComplete  from "./AutoComplete.js";
import Pov from "./Pov.js";
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
      last_feature: {},
      surface: 0,
      visible: false,
      baseMap: this.arcgisMap,
      map_name: "",
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
    this.mediumLowVector = new olVectorLayer({
      title: "medium low Risk",

      source: this.mediumLow,

      style: new Style({
        stroke: new Stroke({
          // color: symbolLineColor,

          width: 1,

          // lineDash: [4, 8]
        }),

        fill: new Fill({
          color: "#FFC100",
        }),
      }),
    });
    this.format = new GeoJSON();

    this.changeBaseMap = this.changeBaseMap.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
    this.coordinate = this.coordinate.bind(this);
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

    
    const oneSecond = 1500;

         this.intervalID = setInterval(() => {
             this.fetch_data()
             if(JSON.parse(sessionStorage.getItem('parcels'))){
             let Longeur =  JSON.parse(sessionStorage.getItem('parcels')).length
             if( Longeur != Number(sessionStorage.getItem('indice'))){
               console.log("beforing",this.mediumLow.getFeatures())
                this.mediumLow.clear();
                
                JSON.parse(sessionStorage.getItem('parcels')).forEach(({ geometry }) => {
                 
            
                  this.mediumLow.addFeatures(
                    this.format.readFeatures(geometry, { featureProjection: "EPSG:3857" })
                  );})

              
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
    JSON.parse(sessionStorage.getItem('parcels')).forEach(({ geometry }) => {
      // let jsonData = JSON.parse(geometry)
      // jsonData["crs"] = {"type":"name","properties":{"name":"EPSG:3857"}}
      

      this.mediumLow.addFeatures(
        this.format.readFeatures(geometry, { featureProjection: "EPSG:3857" })
      );

      console.log("lmm",i++);
      sessionStorage.setItem('indice',i)
      console.log("Lmm",this.state)

      console.log(
        this.format.readFeature(geometry, { featureProjection: "EPSG:3857" })
      );
    });

    this.olmap.on("click", (e) => {
      this.olmap.forEachFeatureAtPixel(e.pixel, (feature, Layer) => {
        for (var i = 0; i < JSON.parse(sessionStorage.getItem('parcels')).length; i++) {
          if (
            JSON.stringify(
              JSON.parse(JSON.parse(sessionStorage.getItem('parcels'))[i].geometry).coordinates
            ) ===
            JSON.stringify(
              JSON.parse(this.format.writeGeometry(feature.getGeometry()))
                .coordinates
            )
          ) {
            console.log(JSON.parse(sessionStorage.getItem('parcels'))[i]);
          }
        }
      });
    });
  }

    this.olmap.addLayer(this.mediumLowVector);

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

  render() {
    console.log("state of render ", this.state);
    return (
      <div
        id="map"
        className="grid-margin"
        style={{ width: "100%", height: "auto" }}
      >
        <div
          className="d-flex flex-column bd-highlight mb-3"
          style={{ position: "absolute", marginLeft: "35px", zIndex: 1 }}
        >
          <div className="d-flex flex-row bd-highlight add_polygone">
            <div className="p-2 bd-highlight">
              <Popup
                user={JSON.parse(sessionStorage.getItem('user'))}
                last_feature={this.state.last_feature}
                surface={this.state.surface}
                update={() => {
                  this.setState({ done: true });
                }}
              />
            </div>
            <div className="p-2 bd-highlight">
              <button
                className="btn btn-warning me-md-2 "
                type="button"
                id="submit_par"
                style={{ visibility: "hidden" }}
              >
                submit
              </button>
            </div>
            <div className="p-2 bd-highlight">
              <button
                
                type="button"
                className="btn btn-success btn-fw "
                id="drow_polygone"
              >
                + Add polygone
              </button>
            </div>

            <div className="p-2 bd-highlight">
              <button
                className="btn btn-danger me-md-2 "
                type="button"
                id="undo"
                style={{ visibility: "hidden" }}
              >
                undo
              </button>
            </div>

            <div className="p-2 bd-highlight">
            <AutoComplete coordinate={this.coordinate} />
            </div>
          </div>

          <div className="d-flex flex-row bd-highlight add_polygone">
            <Pov changeBaseMap={this.changeBaseMap}/>
            
          </div>

        </div>
      </div>
    );
  }
}

export default PublicMap;
