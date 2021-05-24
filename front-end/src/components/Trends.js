// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrends } from '../actions/trend';
import { isEmpty } from './Utils';
import { NavLink } from "react-router-dom";

// Fonction principale
function Trends() {

    // Store de Redux (Stockage de données + Fournisseur de données)
    const posts = useSelector(state => state.allPostsReducer);
    const usersData = useSelector(state => state.userReducer);
    const trendList = useSelector(state => state.trendingReducer);

    // Constante dispatch
    const dispatch = useDispatch();

    // useEffect pour récupérer les posts les plus aimés
    useEffect(() => {
        if (!isEmpty(posts[0])) {
            // Création d'un tableau des posts
            const postsArr = Object.keys(posts).map(i => posts[i]);
            // Triage des posts du post avec le plus grand nombre de like au post avec le plus petit nombre
            let sortedArray = postsArr.sort((a, b) => {
                return b.Users.length - a.Users.length;
            });
            // Sur le tri effectué, on garde les 3 posts avec le plus de like
            sortedArray.length = 3;
            // Dispatch de getTrends, avec le tableau
            dispatch(getTrends(sortedArray));
        }
    }, [posts, dispatch]);

    return (
        <div className="trending-container">
            <h4>Tendances</h4>
            <NavLink exact to="/trending">
                <ul>
                    {!isEmpty(trendList) &&
                        trendList.map((post) => {
                            return (
                                <li key={post.id}>
                                    <div>
                                        {post.imageUrl && <img src={post.imageUrl} alt="post-pic" />}
                                        {post.videoUrl && (
                                            <iframe
                                                src={post.videoUrl}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={post._id}
                                            ></iframe>
                                        )}
                                        {isEmpty(post.imageUrl) && isEmpty(post.videoUrl) && (
                                            <img
                                                src={"./img/icon.svg"}
                                                //src={
                                                    //usersData[0] &&
                                                    //usersData
                                                        //.map((user) => {
                                                            //if (user.id === post.UserId) {
                                                                //return user.pictureUrl;
                                                            //} else return null;
                                                        //})
                                                        //.join('')
                                                //}
                                                alt="trend-pic"
                                            />
                                        )}
                                    </div>
                                    <div className="trend-content">
                                        <p>{post.content}</p>
                                        <span>Voir la publication</span>
                                    </div>

                                </li>
                            )
                        })
                    }
                </ul>
            </NavLink>
        </div>
    )
}

// Export
export default Trends;