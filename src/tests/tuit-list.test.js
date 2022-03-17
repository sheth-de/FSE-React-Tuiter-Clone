import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";


// jest.mock('axios');
const mock = jest.spyOn(axios, 'get');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];


const MOCKED_TUIT_OBJS = [
  { _id : "789",
    tuit : "alice's tuit",
    postedBy : "622d7d60ee293dd1b7ebb256",
    postedOn :"2021-12-25T00:00:00.000Z"
  },
  { _id : "456",
    tuit : "bob's tuit",
    postedBy : "62030d44b08b2ad878f930e7",
    postedOn :"2021-12-25T00:00:00.000Z"
  },
  {  _id : "123",
     tuit : "charlie's tuit",
     postedBy : "62030d70b08b2ad878f930e9",
     postedOn :"2021-12-25T00:00:00.000Z"
  }
];


test('tuit list renders static tuit array', () => {
    render(
        <HashRouter>
            <Tuits  tuits={MOCKED_TUIT_OBJS}/>
        </HashRouter>
    );
    const linkElement = screen.getByText(/charlie's tuit/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  // TODO: implement this
    mock.mockRestore();
    const tuits = await findAllTuits()
    render(
        <HashRouter>
            <Tuits  tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Mars rover landed and our Ingenuity helicopter took flight. Two asteroid missions launched to the skies, and another began its journey home to Earth. A look back at highlights for our #NASAScience planetary missions/i);
    expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  // TODO: implement this
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUIT_OBJS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits  tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/alice's tuit/i);
    expect(tuit).toBeInTheDocument();
});
