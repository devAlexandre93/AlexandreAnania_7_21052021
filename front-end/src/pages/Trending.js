// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import LeftNav from '../components/LeftNav';
import { isEmpty } from "../components/Utils";
import Trends from "../components/Trends";
import Card from "../components/Post/Card";

// Logique de la fonction principale
function Trending() {

    // Constante permettant de récupérer l'Id de l'utilisateur connecté
    const uid = useContext(UidContext);

    // Store de Redux (Stockage de données + Fournisseur de données)
    const trendList = useSelector((state) => state.trendingReducer);

    return (
        <div className="trending-page">
            <LeftNav />
            <ul>
                {!isEmpty(trendList[0]) && trendList.map((post) => <Card post={post} key={post._id} />)}
            </ul>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                </div>
            </div>
        </div>
    )
};

export default Trending
