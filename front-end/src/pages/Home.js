// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav';
import NewPostForm from '../components/Post/NewPostForm';
import Log from '../components/Log';
import Trends from '../components/Trends';
import Thread from '../components/Thread';

// Logique de la fonction principale
function Home() {

    // Constante permettant de récupérer l'Id de l'utilisateur connecté
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                <Thread />
            </div>
            <div className='right-side'>
                <div className='right-side-container'>
                    <div className='wrapper'>
                        <Trends />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home
