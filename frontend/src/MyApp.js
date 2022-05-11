import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";
// force ci run

function MyApp() {
  // const API_BASE_URL = 'http://localhost:5000/users';
  const API_BASE_URL = "https://csc307-api-bklingen.herokuapp.com/users";

  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const person = characters[index]._id;
    makeDeleteCall(person).then((result) => {
      if (result.status === 204) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    });
  }

  function updateList(person) {
    makePostCall(person).then((result) => {
      if (result && result.status === 201)
        setCharacters([...characters, result.data]);
      console.log(result);
    });
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) setCharacters(result);
    });
  }, []);

  async function fetchAll() {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data.users_list;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  async function makePostCall(person) {
    try {
      const response = await axios.post(API_BASE_URL, person);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete(API_BASE_URL + "/" + id);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return (
    // This is what we had before:
    // <div className="container">
    //   <Table characterData={characters} removeCharacter={removeOneCharacter} />
    //   <Form handleSubmit={updateList} />
    // </div>
    <div className="container">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/users-table">List all</Link>
            </li>
            <li>
              <Link to="/form">Insert one</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Choose your path!</h1>} />
          <Route
            path="/users-table"
            element={
              <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
            }
          />
          <Route path="/form" element={<Form handleSubmit={updateList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
