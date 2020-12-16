import React,{useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LineTo from 'react-lineto';
import './App.css';

const styles = {
  marker:{
    width: '25px',
    height: '25px',
    background: 'red',
    textAlign: 'center',
    fontSize: "20px",
    color: "white"
  }

}

const defaultProps = {
  center: {
    lat: 47.843589233319655,
    lng: 35.13148953036964
  },
  zoom: 15
};

const App =() => {
  const [state,setState] = useState({
    count : 0,
    markers : [],
    connections : []
  })

  const [line,setLine] = useState([])


  const onAddMarker = (e) => {
    setState({...state,
      markers:[...state.markers,{lat:e.lat,lng:e.lng,text:state.markers.length + 1,x:e.x,y:e.y }]
    })
  }

  const AnyReactComponent = ({ text,elem,className }) => <div className={className} onClick={() =>onMarkerClick(elem,className)} style={styles.marker}>{text}</div>;

  const mapMarkers = (elem) =>(
    <AnyReactComponent
      key={elem.text}
      lat={elem.lat}
      lng={elem.lng}
      text={elem.text}
      elem={elem}
      className={`lat${elem.lat}`}

    />
  )
  const onMarkerClick = (elem,className) => {
    if(line.length === 0){
      setLine([...line,className])
    }else{
      setState({...state,connections:[...state.connections,{from:line[0],to:className}]})
      setLine([])
    }
    console.log(elem)
  }
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBsEBwxHS-PT22QG4XwVB8DgNSQTg3uHb0" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={onAddMarker}
      >
        <AnyReactComponent
          lat={47.843589233319655}
          lng={35.13148953036964}
          text={0}
          onClick={() =>console.log(this)}
        />
        {state.markers.map(mapMarkers)}
        {state.connections.map(elem =><LineTo className="linetocomponent" from={elem.from} to={elem.to} />)
        }
      </GoogleMapReact>
    </div>
  );
 

}

 
export default App;
