import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits
} from "../services/tuits-service"


describe('can create tuit with REST API', () => {
  // TODO: implement this
    const sampleTuit = {
        tuit: 'Hello'
    }
    let newTuit
    test('can insert new tuits with REST API', async () => {
        // insert new user in the database
         newTuit = await createTuit("62030d23b08b2ad878f930e5",sampleTuit);
        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
    });
    afterAll(() => {
        // remove any data we created
        return deleteTuit(newTuit._id);
    })
});


describe('can delete tuit wtih REST API', () => {
  // TODO: implement this

    const sampleTuit1 = {
        tuit: 'Hello'
    }

    let newTuit1
    // setup the tests before verification
    beforeAll(async () => {
        // insert the sample user we then try to remove
        newTuit1 = await createTuit("62030d23b08b2ad878f930e5",sampleTuit1);
        return newTuit1;
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuit(newTuit1._id);
    })
    test('can delete users from REST API by username', async () => {
        // delete a user by their username. Assumes user already exists
        const status = await deleteTuit(newTuit1._id);
        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
    const sampleTuit2 = {
        tuit: 'Hello'
    }
    let newTuit2
    test('can retrieve tuit from REST API by primary key', async () => {
        // insert the user in the database
        newTuit2 = await createTuit("62030d23b08b2ad878f930e5",sampleTuit2);

        // verify new user matches the parameter user
        expect(newTuit2.tuit).toEqual(sampleTuit2.tuit);

        // retrieve the user from the database by its primary key
        const existingTuit = await findTuitById(newTuit2._id);

        // verify retrieved user matches parameter user
        expect(existingTuit.tuit).toEqual(sampleTuit2.tuit);

    });
    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteTuit(newTuit2._id);
    });
});


describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
    // sample tuits we'll insert to then retrieve
    const tuits = [
        "Hi", "Hello", "Good Morning"
    ];

    let tuitInserted = new Array(tuits.length)
    let i =0
    // setup data before test
    beforeAll(async () =>
        // insert several known users
        await Promise.all(tuits.map(async tuitTemp => {
            tuitInserted[i] = await createTuit("62030d23b08b2ad878f930e5", {tuit: tuitTemp}).then(i=i+1)
        })

    ));
    // clean up after ourselves
    afterAll( async () =>
        // insert several known users
        await Promise.all(tuitInserted.map(async tuitTemp => {
                 await deleteTuit(tuitTemp._id)
            })
        ));

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the users
        const fetchTuits = await findAllTuits();

        // there should be a minimum number of users
        expect(fetchTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each user we inserted
        const fetchTuitStrings = fetchTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        fetchTuitStrings.forEach(fetchedTuit => {
            const tuitString = tuits.find(tuit => tuit === fetchedTuit.tuit);
            expect(fetchedTuit.tuit).toEqual(tuitString);
        });
    });
});