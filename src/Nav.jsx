import React, { useEffect, useState } from 'react';
import "./Nav.css"

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 100){
                handleShow(true);
            } else handleShow(false);
        });
        return ()=>{
            window.removeEventListener("scroll", ()=>{
                if(window.scrollY > 100){
                    handleShow(true);
                } else handleShow(false);
            });
        };
    })

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav_logo" src="https://www.designbust.com/download/1037/png/netflix_logo_png_transparet512.png" alt="Netflix Logo"/>
            <img className="nav_avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar Logo"/>
        </div>
    )
}

export default Nav
