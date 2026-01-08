import React from 'react'
import logo from '../logo.png'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = ({links}) => {
  return (
    <div>
        <header style={{ backgroundColor: '#AD3A3C' , color: 'white' , display: 'flex', justifyContent: 'space-between' }}>
            <div style={{display: 'flex', alignItems: 'center', paddingLeft: '30px', fontSize: '20px', fontWeight: 'bold'}}>
                <img src={logo} alt="Logo" style={{height: '10vh', marginRight: '10px',padding:'20px'}} />
            </div>
            <nav style={{display: 'flex',alignItems: 'center', gap: '2vw',color: 'white', paddingRight: '2vw',paddingLeft: '5vw'}}>
            <ul>
                {links && links.map((item, index) => (
                    <li key={index} style={{listStyleType: 'none', display: 'inline', marginRight: '20px'}}>
                        <NavLink to={item.link} style={{color: 'white', textDecoration: 'none', fontSize: '2vh'}} >{item.name}</NavLink>
                    </li>
                ))}
            </ul>
            </nav>
        </header>
      </div>
  )
}

export default Navbar