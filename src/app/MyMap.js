import React, { Component } from "react";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import scscaleline from 'ol/control/ScaleLine';
import fullscreen from 'ol/control/FullScreen';
import mouseposition from 'ol/control/MousePosition';
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

class PublicMap extends Component {

  constructor(props) {
    super(props);

    this.state = { center: [-777823.1998299537, 3502650.384139917], zoom: 5 , source : new VectorSource({wrapX: false}), classname: false};
    this.vector = new olVectorLayer({
      source: this.state.source,
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
          maxZoom: 15,
          minZoom:5
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
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addInteraction = this.addInteraction.bind(this);
  }

  handleChange = address => {
    this.setState({ address });
  };
  handleSelect(){

  }

  updateMap() {
    this.olmap.getView().setCenter(this.state.center);
    this.olmap.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    
    this.olmap.setTarget("map");
    // Listen to map changes
    this.olmap.on("moveend", () => {
      let center = this.olmap.getView().getCenter();
      let zoom = this.olmap.getView().getZoom();
      this.setState({ center, zoom });
    });

     this.olmap.on('click', (e) => {
         console.log(e.coordinate)
      });
  
    //drawing polygon
    document.getElementById('drow_polygone').addEventListener('click' ,() => 
    {
    this.setState({classname:true})
    this.olmap.removeInteraction(this.draw);
    this.addInteraction()
  }
    )

  
      document.getElementById('undo').addEventListener('click', () => {if(this.draw){this.draw.removeLastPoint()}});
    
    


  }
  
  addInteraction() {

      this.draw = new Draw({
        source: this.state.source,
        type: 'Polygon',
      });
      this.olmap.addInteraction(this.draw);
  }
  


  shouldComponentUpdate(nextProps, nextState) {
    let center = this.olmap.getView().getCenter();
    let zoom = this.olmap.getView().getZoom();
    if (center === nextState.center && zoom === nextState.zoom) return false;
    return true;
  }

  CenterMap(long, lat) {
    console.log("Long: " + long + " Lat: " + lat);
    this.olmap.getView().setCenter(transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    this.olmap.getView().setZoom(15);
}

  render() {
    this.updateMap(); // Update map on render?
    return (
      <React.Fragment>
      <div id="map" className='grid-margin' style={{ width: "100%", height: "auto" }}>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end  add_polygone">
        
        <button visible type="button" className="btn btn-success btn-fw " id="drow_polygone">
        + Add polygone
        </button>
        <button className="btn btn-danger me-md-2 "  type="button" id="undo" >undo</button>
        </div>
       

        <div className="input-group flex-nowrap " style={{ width: "30%", height: "auto",margin:'20px' }} >
        <div>
         <Autocomplete
         className="input-group flex-nowrap"
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

        
      </div>
      
            </React.Fragment>
      
    );
  }
}

export default PublicMap;
