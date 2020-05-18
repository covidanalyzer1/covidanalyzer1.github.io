import React, { useState, useEffect } from "react"
import axios from 'axios'
import Show from './show'
import Navbar from './navbar'
import './main.css'

const District = (props) =>{
    const [districtList, setDistrictList] = useState([]);
    const[loading, setloading] = useState(true)
    const id=props.match.params.id
    useEffect(() => {
        axios.get('https://api.covid19india.org/v2/state_district_wise.json').then(districtResult => {
          setloading(false)
          let districtwiseData = districtResult.data
          districtwiseData.forEach(states=>{
            if(states.state === id){
              let districtData = states.districtData;
                districtData.sort(function(a,b){return b.confirmed-a.confirmed})
                setDistrictList(districtData)
            }})
        });        
      }, [id])

    
    

    return(
      <div>
        <Navbar />
        <div className="main">
        {loading?<h2 style={{textAlign:'center',color:'red'}}>loading...</h2>:null}
        <h2 style={{textAlign:'center',marginTop:'5px'}}><strong>{props.match.params.id}  Districtwise Stats</strong></h2>
        <div className="head">
          <div className="headitem1"><strong>District</strong></div>
          <div className="headitem"><strong>Confirmed</strong></div>
          <div className="headitem"><strong>Active</strong></div>  
          <div className="headitem"><strong>Recovered</strong></div>
          <div className="headitem"><strong>Deceased</strong></div>
        </div>   
        {districtList.map(total => <Show key={total.district} identity="hii" name={total} />)}
      </div>
      </div>
    )
}

export default District