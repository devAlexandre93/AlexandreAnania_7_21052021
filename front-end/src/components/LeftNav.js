// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftNav() {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink to='/' exact activeClassName='active-left-nav'>
                        <img src='./img/icons/home.svg' alt='home' />
                    </NavLink>
                    <br />
                    <NavLink to='/profile' exact activeClassName='active-left-nav'>
                        <img src='./img/icons/user.svg' alt='home' />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftNav