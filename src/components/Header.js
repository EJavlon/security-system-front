import "../css/Header.css";

import {  useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({exit,setExit})=> {    
    const logOutClickEvent = ()=>{
        setExit(false);
    }
    return (
        <header id="main-header" className="main-header">
            <div className="container">
                <div className="wrapper">
                    <div className="main-header__logo">
                        <h1 className="a" to="/">Security System</h1>                                            
                    </div>                               
                    {
                        exit ? <Link className="exit" to="/" onClick={logOutClickEvent}>Logout</Link> :""
                    }
                </div>                    
            </div>
        </header>);
}

export default Header;