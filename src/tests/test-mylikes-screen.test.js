import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuitsLikedByUser} from "../services/likes-service";
import axios from "axios";



const mock = jest.spyOn(axios, 'get');

const MOCKED_LIKED_TUITS = [

    {_id:"62030e24b08b2ad878f930f0",
        tuit:"Hello World",
        postedBy:"62030d86b08b2ad878f930eb",
        postedOn: "2021-12-25T00:00:00.000+00:00",
        stats: {
            dislikes: 1,
            likes: 20,
            replies:0,
            retuits:0
        }
    }

    ,

    {_id:"62030e24b08b2ad878f930f1",
        tuit:"Hello All",
        postedBy:"62030d86b08b2ad878f930e2",
        postedOn: "2021-12-25T00:00:00.000+00:00",
        stats: {
            dislikes: 5,
            likes: 2,
            replies:1,
            retuits:0
        }
    }
];


test('tuit list renders static liked tuits array', () => {
    render(
        <HashRouter>
            <Tuits  tuits={MOCKED_LIKED_TUITS}/>
        </HashRouter>
    );
    const linkElement = screen.getByText(/Hello World/i);
    expect(linkElement).toBeInTheDocument();
});

test('list of tuits liked by user are rendered on my likes screen as expected', async () => {
    mock.mockRestore();
    const tuits = await findAllTuitsLikedByUser("623e2f52ddc17cffb9a94efc")
    render(
        <HashRouter>
            <Tuits  tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Hi All/i);
    expect(linkElement).toBeInTheDocument();
})

test('liked tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_LIKED_TUITS} }));
    const response = await findAllTuitsLikedByUser("623e2f52ddc17cffb9a94efc");
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits  tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/Hello/i);
    expect(tuit).toBeInTheDocument();
});
