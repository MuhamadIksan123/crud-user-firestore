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
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const usersCollectionRef = collection(db, 'users');

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const createUser = async () => {
    try {
      setIsLoading(true);
      await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
      setNewName('');
      setNewAge(0);
      getUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id, age) => {
    try {
      setIsLoading(true);
      const userDoc = doc(db, 'users', id);
      const newFields = { age: age + 1 };
      await updateDoc(userDoc, newFields);
      getUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      const userDoc = doc(db, 'users', id);
      await deleteDoc(userDoc);
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="container mt-4">
        <h2 className='fw-bold mb-4'>Data Users</h2>
        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control mb-2"
              type="text"
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              placeholder="Name..."
              value={newName}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control mb-2"
              type="number"
              onChange={(event) => {
                setNewAge(event.target.value);
              }}
              placeholder="Age..."
              value={newAge}
            />
          </div>
          <div className="row">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={createUser}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        {isLoading ? (
          <div className="row">
            <div className="col-md-6">
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <table className="table table-bordered table-auto">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.age}</td>
                      <td>
                        <button
                          className="btn btn-success mx-1 btn-sm"
                          onClick={() => {
                            updateUser(user.id, user.age);
                          }}
                        >
                          Increase Age
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                        >
                          Delete User
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
