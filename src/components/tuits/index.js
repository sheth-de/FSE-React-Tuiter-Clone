import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service"
import * as service from "../../services/tuits-service";
import {useNavigate} from "react-router-dom";
const Tuits = ({tuits = [], refreshTuits}) => {
    const navigate = useNavigate();
    const likeTuit = (tuit) =>
        likesService.userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => {
                navigate('/login');
                window.location.reload(false);
            })
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);
    const dislikeTuit = (tuit) =>
        dislikesService.userDislikesTuit("me",tuit._id)
            .then(refreshTuits)
            .catch(e => {
                navigate('/login');
                window.location.reload(false);
            })

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit className="the-tuit"
                        key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}

export default Tuits;