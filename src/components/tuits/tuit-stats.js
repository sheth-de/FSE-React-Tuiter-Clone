import React, {useEffect, useState} from "react";
import * as service from "../../services/likes-service";



const TuitStats = ({tuit, likeTuit = () => {}}) => {
    const [likedTuits, setLikedTuis] = useState([]);
    const findTuitsILike = () =>
        service.findAllTuitsLikedByUser("me")
            .then((tuits) => setLikedTuis(tuits));
    useEffect(findTuitsILike, []);
    const userLiked = false;
    const checkIfUserLikedATuit = () => {
        
    }
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-replies">{tuit.stats.replies}</span>
          }
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
          }
        </div>
        <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {

              }
                      <i className="fa-regular fa-thumbs-up" ></i>
              {tuit.stats &&
                      <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
              }
               </span>
        </div>
          <div className="col">
          <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
              {
                  <>
                      <i className="fa-regular fa-thumbs-down" ></i>
                      <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
                  </>
              }
          </span>
          </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;
