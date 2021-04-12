import Layout from "../components/layout";
import Navbar from "../components/navbar";
import AuthStudents from "../components/AuthStudent";
import Styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
// import useSWR from 'swr'
import config from "../config/config";

const URL = `${config.URL}/students`;
const Students = ({ token }) => {
  const [students, setStudents] = useState({
    list: [{ id: 1, fname: "Foo", surname: "Bar", major: "CoE", gpa: 2.12 }],
  });
  const [fname, setFname] = useState("");
  const [surname, setSurname] = useState("");
  const [major, setMajor] = useState("");
  const [gpa, setGpa] = useState(0);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    let student = await axios.get(`${config.URL}/students`);
    setStudents(student.data);
  };

  const updateStudent = async (id) => {
    let student = await axios.put(`${URL}/${id}`, {
      fname,
      surname,
      major,
      gpa,
    });
    setStudents(student.data);
  };

  const deleteStudent = async (id) => {
    let student = await axios.delete(`${URL}/${id}`);
    setStudents(student.data);
  };

  const addStudent = async (fname, surname, major, gpa) => {
    let student = await axios.post(
      `${config.URL}/students`,

      { fname, surname, major, gpa }
    );
    setStudents(student.data);
  };

  const printStudents = () => {
    if (students.list && students.list.length)
      return students.list.map((item, index) => (
        <li key={index}>
          name: {item.fname}, surname: {item.surname}, major: {item.major}, gpa:{" "}
          {item.gpa}
          <button onClick={() => updateStudent(item.id)}>Update</button>
          <button onClick={() => deleteStudent(item.id)}>Delete</button>
        </li>
      ));
  };
  return (
    <Layout>
      <div className={Styles.container}>
        <Navbar />
        <br></br>
        <ul>{printStudents()}</ul>
        <h2>Insert Student</h2>

        <input
          /*name*/
          type="text"
          placeholder="name"
          onChange={(e) => setFname(e.target.value)}
        ></input>
        <br></br>

        <input
          /*surname*/
          type="text"
          placeholder="surname"
          onChange={(e) => setSurname(e.target.value)}
        ></input>
        <br></br>
        <input
          /*major*/
          type="text"
          placeholder="major"
          onChange={(e) => setMajor(e.target.value)}
        ></input>
        <br></br>
        <input
          /*gpa*/
          type="number"
          placeholder="gpa"
          onChange={(e) => setGpa(e.target.value)}
        ></input>
        <br></br>
        <div class = 'button'>
             <button onClick={() => addStudent(fname, surname, major, gpa)}>
          Add
        </button>
        </div>
       
      </div>
    </Layout>
  );
};

export default AuthStudents(Students);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
