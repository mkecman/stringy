// Import the functions you need from the SDKs you need
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { endBefore, equalTo, getDatabase, off, onChildChanged, ref, update, Unsubscribe, push } from "firebase/database";
import { get, set, query, onValue, orderByChild, limitToFirst, limitToLast, startAt, endAt, remove } from "firebase/database"
import * as moment from 'moment';
import * as dayjs from 'dayjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBz1lXBpYBPqEzy1Ndn-_nl1g9U6RVIlBw",
    authDomain: "lifetracker-1a808.firebaseapp.com",
    databaseURL: "https://lifetracker-1a808-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lifetracker-1a808",
    storageBucket: "lifetracker-1a808.appspot.com",
    messagingSenderId: "129473461346",
    appId: "1:129473461346:web:3e3c307ce899148f2da53b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const listeners = {};

export function getReference(path)
{
    return ref(db, path);
}

export async function getDataAsync(path, callback)
{
    const dataSnapshot = await get(query(ref(db, path)));
    callback(dataSnapshot.val());
}

export function startListening(path, callback)
{
    let dbRef = ref(db, path);
    let unsubFunc = onValue(dbRef, snapshot =>
    {
        callback(snapshot.val());
    });

    let newId = uuidv4();
    let listenerData = {
        unsubscribe: unsubFunc,
        dbReference: dbRef,
        id: newId
    }

    listeners[newId] = listenerData;
    return newId;
}

export function stopListening(listenerId)
{
    if (listeners[listenerId])
    {
        //off(listeners[listenerId].dbReference);
        listeners[listenerId].unsubscribe();
        delete listeners[listenerId];
        console.log("Deleted listener: " + listenerId);
    }
    else
        console.log("Can't find requested listener: " + listenerId);
}

export function startListeningChildrenChanged(path, callback)
{
    let dbRef = ref(db, path);
    let unsubFunc = onChildChanged(dbRef, snapshot =>
    {
        callback(snapshot.val());
    });

    let newId = uuidv4();
    let listenerData = {
        unsubscribe: unsubFunc,
        dbReference: dbRef,
        id: newId
    }

    listeners[newId] = listenerData;
    return newId;
}

export async function getListOrderByChildEndBeforeLimit(path, callback, childName, endBeforeDate, limit = 20, descending = true)
{
    const dataSnapshot = await get(query(ref(db, path), orderByChild(childName), endBefore(endBeforeDate), limitToLast(limit)));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        result.push(childSnapshot.val());
    });

    if (descending)
        result.reverse();

    callback(result);
}

export async function getTaskLogsForDate(path, callback, childName, startAtDate, limit = 20, descending = true)
{
    const dataSnapshot = await get(query(ref(db, path), orderByChild(childName), startAt(startAtDate), endBefore(dayjs(startAtDate).add(1, "day").format("YYYY-MM-DD")), limitToLast(limit)));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        let child = childSnapshot.val();
        child.id = childSnapshot.key;
        result.push(child);
    });

    if (descending)
        result.reverse();

    callback(result);
}

export async function getListOrderByChild(path, callback, childName)
{
    const dataSnapshot = await get(query(ref(db, path), orderByChild(childName)));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        result.push(childSnapshot.val());
    });

    callback(result);
}

export async function getList(path, callback)
{
    const dataSnapshot = await get(query(ref(db, path)));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        result.push(childSnapshot.val());
    });

    callback(result);
}

export async function getSearchPatients(search, callback)
{
    const dataSnapshot = await get(query(ref(db, '/patients'), orderByChild('name'), startAt(search), endAt(search +'\uf8ff')));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        result.push(childSnapshot.val());
    });

    callback(result);
}

export async function getPatientsProtocols(callback, patientId)
{
    const dataSnapshot = await get(query(ref(db, '/patients_protocols'), orderByChild('patient'), equalTo(patientId)));
    let result = [];
    dataSnapshot.forEach((childSnapshot) =>
    {
        result.push(childSnapshot.val());
    });

    result.sort((a, b) => new Date(b.date) - new Date(a.date));

    callback(result);
}

export function deleteData(path, callback = null)
{
    remove(ref(db, path))
        .then(() =>
        {
            console.log("Data at " + path + " removed successfully!");
            if (callback) callback();
        })
        .catch((error) =>
        {
            console.error("An error occurred:", error);
        });
}

export function updateData(path, value, callback = null)
{
    update(ref(db, path), value).then(() =>
    {
        // Data updated successfully!
        if (callback)
            callback();
    })
    .catch((error) =>
    {
        // The update failed...
        console.log("ERROR: " + error);
    });
}

export function writeData(path, value, callback = null)
{
    set(ref(db, path), value).then(() =>
    {
        // Data saved successfully!
        if (callback)
            callback();
    })
    .catch((error) =>
    {
        // The write failed...
        console.log("ERROR: " + error);
    });
}

export function pushData(path, value, callback = null)
{
    push(ref(db, path), value).then(() =>
    {
        // Data pushed successfully!
        if (callback)
            callback();
    })
    .catch((error) =>
    {
        // The write failed...
        console.log("ERROR: " + error);
    });
}