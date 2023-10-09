import "../../css/admin/AddUser.css";
import React, { useEffect, useState } from 'react';
import userAvatar from "../../assets/images/user-avatar.png";
import selectImage from "../../assets/images/select_image.png";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

import { v4 as uuidv4 } from 'uuid';

export default function AddUser({setExit}) {
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });  

  const[avatar,setAvatar] = useState(userAvatar);    
  const [newtworks,setNetworks] = useState([]);
  const [emails,setEmails] = useState([]);
  const [phones,setPhones] = useState([]);
  const [additionalInformations,setAdditionalInformations] = useState([]);
  const[networkCount,setNetworkCount] = useState(1);

  const socialNetwork = <><input type="url" className={"socialNework"} placeholder="URL"/> <MySelect name={"Networks"} tag={"network"} networkCount={networkCount}/></>
  const email = <input type="email" className="email" placeholder="Email"/>;
  const phone = <input type="email" className="tel" placeholder="Phone Number"/>;

  const additionalInformation = <div key={uuidv4()} className="row" style={{flexDirection:"column"}}>                
      {/* <img src={selectImage} alt="avatar" style={{width:"130px",height:"130px",marginBottom:"1rem"}}/> <br/>               */}
      {/* <Button component="label" style={{marginBottom:"1rem"}} variant="contained" startIcon={<CloudUploadIcon />}>
        Upload Image
        <VisuallyHiddenInput type="file" className="additionalFile"/>
      </Button>    */}
      <input type="file" className="additionFile"/>
      <textarea rows={15} cols={50} placeholder="Additional information"/>                       
    </div> 

  
  useEffect(()=>{    
    document.title = "Add New User";
    setExit(true);          
  },[]);    

  const changeAvatar = (id,file)=>{        
    const reader = new FileReader();
    reader.onload = function() {               
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const addNewNetwork = ()=>{  
    setNetworkCount(networkCount + 1);
    setNetworks(n=> [...n,socialNetwork]);
  }

  const addEmail = ()=>{
    setEmails(e=>[...e,email]);
  }

  const addPhone = ()=>{
    setPhones(p=>[...p,phone]);
  }

  const addAdditionalInformation = ()=>{
    setAdditionalInformations(ad=>[...ad,additionalInformation]);
  }

  return (
    <section id="add-user-section" className="add-user-section">
        <div className="container">
            <div className="private-data">
              <div className="user-avatar">
                <img src={avatar} alt="avatar"/> <br/>              
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                   Upload Image
                  <VisuallyHiddenInput type="file" id="avatar" onChange={(e)=> changeAvatar(e.target.id,e.target.files[0])}/>
                </Button>                   
              </div>
              <div className="row">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" placeholder="First name"/> 

                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last name"/> 

                <label htmlFor="fathersName">Father's name</label>
                <input type="text" id="fathersName" placeholder="Father's name"/> 

                <label htmlFor="birthDay">Date of birth</label>
                <input type="date" id="birthDay"/> 

                <label htmlFor="passport">Passport</label>
                <input type="text" id="passport" placeholder="AB1234567"/> 

                <MySelect name={"Region"} tag={"region"}/>
                <MySelect name={"District"} tag={"district"} />      
              </div>
            </div>
            <div className="private-data-2">
              <h1>Social Networks</h1>
              <div className="row">                                
                <input type="url" className="socialNework" placeholder="URL"/> 
                <MySelect name={"Networks"}  tag={"network"} networkCount={0}/>    
                               
              </div>
              {                     
                newtworks.map((item)=> <div className="row" key={uuidv4()}>{item}  </div>)
              }
              <Button component="label" variant="contained"  onClick={addNewNetwork}>{<AddIcon />}</Button> 
            </div>
            <div className="private-data-2">
              <h1>Phone numbers</h1>
              <div className="row" style={{width:"70%"}}>                                
                <input type="tel" className="phone-number" placeholder="Phone Number"/>                                               
              </div>
              {                
                phones.map((item)=> <div key={uuidv4()} className="row" style={{width:"70%"}}>{item} </div>)
              }
              <Button component="label" variant="contained"  onClick={addPhone}>{<AddIcon />}</Button> 
            </div>
            <div className="private-data-2">
              <h1>Emails</h1>
              <div className="row" style={{width:"70%"}}>                                
                <input type="email" className="email" placeholder="Email"/>                                               
              </div>
              {
                emails.map((item)=> <div key={uuidv4()} className="row" style={{width:"70%"}}>{item} </div>)
              }
              <Button component="label" variant="contained"  onClick={addEmail}>{<AddIcon />}</Button> 
            </div>
            <div className="private-data-2" >
              <h1>Additional information</h1>
              <div className="row" style={{flexDirection:"column"}}>                
                  {/* <img src={selectImage} alt="avatar" style={{width:"130px",height:"130px",marginBottom:"1rem"}}/> <br/>               */}
                  {/* <Button component="label" style={{marginBottom:"1rem"}} variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload Image
                    <VisuallyHiddenInput type="file" id="additionalFile"/>
                  </Button>    */}
                  <input type="file" className="additionFile"/>
                  <textarea rows={15} cols={50} placeholder="Additional information"/>                       
                  <hr/>
              </div>     
              {
                additionalInformations.map((item)=><>{item}</>)
              }
              <div>
                <Button component="label" variant="contained"  onClick={addAdditionalInformation} sx={{marginRight:"0.5rem"}}>
                  {<AddIcon />}
                </Button>    
                <Button variant="contained" endIcon={<SendIcon />}  sx={{marginLeft:"0.5rem"}}>
                  Save
                </Button>   
              </div>
            </div>
        </div>
        
    </section>
  )
}

function MySelect({name,tag,networkCount}){
  const [select, setSelect] = React.useState('');

  const handleChange = (event) => {
    setSelect(event.target.value);
    if(tag === "network"){
      console.log('count' + networkCount);
      if(networkCount !== undefined){
        let node = document.getElementsByClassName("socialNework")[networkCount];
        switch(event.target.value){
          case "Telegram" : node.value = networkValue[0]; break;
          case "Instagram" : node.value = networkValue[1]; break;
          case "Facebook" : node.value = networkValue[2]; break;
          case "Boshqa" : node.value = networkValue[3]; break;
        }      
      }    
    }
  };

  const networkValue = ["https://t.me/","https://www.instagram.com/","https://www.facebook.com/"," "]
  const networks = ["Telegram","Instagram","Facebook","Boshqa"]

  return(
    <FormControl fullWidth sx={{margin:"1rem 0"}}>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="network"
          value={select}
          label="#######"          
          onChange={handleChange}
        >
          
        {
          tag === "network" && networks.map(item=> <MenuItem key={uuidv4()} value={item}>{item}</MenuItem>)
        }
        </Select>
      </FormControl>
  )
}