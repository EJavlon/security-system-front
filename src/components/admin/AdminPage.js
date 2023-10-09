import "../../css/admin/AdminPage.css";

import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SearchBox from "./SearchBox";
import DataTable from "./DataTable";

export default function AdminPage({setExit}) {

    const navigate = useNavigate();
    useEffect(()=>{
        setExit(true);
    },[])

    const addUser = ()=>{
        navigate("/addUser");
    }
  return (
    <section  id="main-section" className="main-section">
        <div className="container">                
            <SearchBox/>
            <DataTable/>
            <Fab className="add-btn" color="primary" aria-label="add" onClick={addUser}>
              <AddIcon />
            </Fab>
        </div>
    </section>
  )
}