import {useEffect, useState} from "react";
import * as service from "../../services/dislikes-service";
import Tuits from "../tuits";

const MyDislikes = () => {
    const [dislikedTuits, setdisLikedTuis] = useState([]);
    const findTuitsIdislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setdisLikedTuis(tuits));
    useEffect(findTuitsIdislike, []);

    return(
        <div>
            <h2>My Dislikes</h2>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIdislike}/>
        </div>
    );
}
export default MyDislikes;