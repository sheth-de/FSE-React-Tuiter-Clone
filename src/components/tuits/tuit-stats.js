import React, {useEffect, useState} from "react";
import * as likeservice from "../../services/likes-service";
import * as securityservice from "../../services/security-service";
import * as dislikeservice from "../../services/dislikes-service"


const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const findTuitsILike = () =>{
        likeservice.findAllTuitsLikedByUser("me")
            .then((tuits) => {
                const tuitLiked = tuits.find(findTuit => findTuit._id === tuit._id)
                if(tuitLiked!==undefined){
                    setLiked(true)
                }
            });
    }

    const findTuitsIDislike = () =>{
        dislikeservice.findAllTuitsDislikedByUser("me")
            .then((tuits) => {
                const tuitDisliked = tuits.find(findTuit => findTuit._id === tuit._id)
                if(tuitDisliked!==undefined){
                    setDisliked(true)
                }
            });
    }

    useEffect(async () => {
        try {
            const user = await securityservice.profile();
            findTuitsILike()
            findTuitsIDislike()
        } catch (e) {
        }
    }, []);

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
          <span className="ttr-like-tuit-click" onClick={() => {
              likeTuit(tuit)
              if(liked){
                  setLiked(false)
              }
              else {
                  setLiked(true)
              }
          }}>
              {
                  liked &&
                  <i className="fa-solid fa-thumbs-up"  style={{color: 'blue'}}></i>
              }
              {
                  !liked &&
                  <i className="fa-regular fa-thumbs-up" ></i>
              }
              {tuit.stats &&
                      <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
              }
               </span>
        </div>
          <div className="col">
          <span className="ttr-dislike-tuit-click" onClick={() => {
              dislikeTuit(tuit)
              if(disliked){
                  setDisliked(false)
              }
              else {
                  setDisliked(true)
              }
          }}>
              {
                  disliked &&
                  <i className="fa-solid fa-thumbs-down"  style={{color: 'red'}}></i>
              }
              {
                  !disliked &&
                  <i className="fa-regular fa-thumbs-down" ></i>
              }
              {tuit.stats &&
                  <span className="ttr-stats-likes">{tuit.stats && tuit.stats.dislikes}</span>
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
