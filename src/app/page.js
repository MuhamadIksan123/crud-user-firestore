'use client';

import { useEffect, useState } from 'react';
import { db } from './firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

export default function Home() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUsers(); // Fetch initial user list when the component mounts
  }, []);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    getUsers();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    getUsers();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  }

  
  return (
    <main>
      <div className="">
        <input
          type="text"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
          placeholder="Name"
        />
        <input
          type="number"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
          placeholder="Age"
        />
        <button type="submit" onClick={createUser}>
          Create User
        </button>
      </div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            {''}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >Increase Age</button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >Delete User</button>
          </div>
        );
      })}
    </main>
  );
}
