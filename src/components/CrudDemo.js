import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react/cjs/react.development';
import axios from 'axios';

const baseURL= "http://localhost:8080/api/v1/person/";

// step1
// create a functional component
const CrudDemo = () => {
    const [skills, setSkills] = useState([]);
    const [loadData, setLoadData] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const studentDefaultData = {id: 0, Name: "", Title: "", Email: "" }
    const [student, setStudent] = useState(studentDefaultData);
    const [persons, setPersons] = useState([]);
    const [message,setMessage] = useState();
    const [error,setError] = useState();
    const [id,setId] = useState(0);
    const PersonDefaultData = {id: 0, Name: "", Title: "", Email: "" }
    const [person, setPerson] = useState(PersonDefaultData);


    useEffect(()=> {
        console.log("useEffect has been executed!");
        
        sendGetRequest();
        // call API get skills list and then set it into the skill list
        //const mySkills = [{id:'A1', title: 'Java SE'}, {id:'A2', title:'Java EE'}];
        //setSkills(mySkills);

    }, [loadData]);

    const sendGetRequest = async () => { // async keyword is used tp make a function asynchronous.
        console.log("start sendGetRequest");
        await axios.get(baseURL).then(res => { // await keyword asks the executor to wait for the defined task to be executed
            console.log("DATA", res.data);
            console.log("STATUS", res.status);
            // update person state
            if(res.status === 200){
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch( err => {
            console.log("ERROR " , err);
            // update error state
            if(err.message){
                setError(err.message);
            } else {
                setError(err);
            }
            setMessage();
        });
        console.log("end sendGetRequest");
    };
    
    const ShowPersonData = (props) => {
        return (
            <Fragment>
                {
                  props.persons.map(
                      person => (
                        <ul className="row pb-2" key={person.id}>
                            <li className="form-lable">{person.id}</li>
                        </ul>
                  ))  
                }
            </Fragment>
        );
    };
    
    // step 2: devide component to small components
    const ShowData = (props) => {
        return (
            <Fragment>
                {
                  props.skills.map(
                      skill => (
                        <ul className="row pb-2" key={skill.id}>
                            <li className="form-lable">{skill.title}</li>
                        </ul>
                  ))  
                }
            </Fragment>
        );
    };
    const Form = () => {
        const { register, handleSubmit, formState: {errors} } = useForm();

        const saveData = (data) => {
            console.log("------------------");
            console.log(data);
            console.log("------------------");
            const id = 'A_'+ Math.random().toString(36).substr(2, 9);
            const title = data.title; 
            const skill = { id, title };
            skills.push(skill);
            setLoadData(!loadData); // !false => true
            console.log("SKILLS:" , skills);
        };

        return (
            <Fragment>
                <h5>My Form</h5>
                <br/>
               <form onSubmit={handleSubmit(saveData)}>
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control" {...register("firstName", { required: true } )}  placeholder="Enter First Name" />
                            {errors.title && <span className="text-danger">Firstname is required!</span>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" {...register("lastName", { required: true } )}  placeholder="Enter Last Name" />
                            {errors.title && <span className="text-danger">Lastname is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <input type="text" className="form-control" {...register("email", { required: true } )}  placeholder="Enter Email" />
                            {errors.title && <span className="text-danger">Email is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <input type="text" className="form-control" {...register("title", { required: true } )}  placeholder="Enter Title" />
                            {errors.title && <span className="text-danger">Title is required!</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                        <br/>
                            <button type="submit" className="btn btn-success">+</button>
                        </div>
                    </div>
                </form> 
            </Fragment>
        );
    };

    const TableHeader = () => {
        return (
        <thead>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Action</td>
        </thead>
        );
    };
    const TableAction = (props) => {

        const showData = () => {
            setShowDetails(true);
            console.log("SHOW DATA",props.student);
            setPerson(props.person);
        };
    
        return (<button type="button" className="btn btn-primary" onClick={showData} >Details</button>);
    
    };

    const TableDelete = (props) => {

        const showData = () => {
            
            
            
            /*setShowDetails(true);
            console.log("SHOW DATA",props.student);
            setPerson(props.person);*/
        };
    
        return (<button type="button" className="btn btn-primary" onClick={showData} >Delete</button>);
    
    };


    const TableRow = (props) => {
        return(
        <tbody>
            {
                props.list.map((student) => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstName}</td>
                    <td>{student.email}</td>
                    <td><TableAction person={student} /></td>
                    <td><TableDelete person={student} /></td>
                </tr>
                    ) )
            }
        </tbody>
        );
    };

    const ShowStudentDetails = () => {

        console.log("Pressed", showDetails);
        if(showDetails){
            return(
                <div className="card">
                    <div className="card-header bg-info text-white">
                        Student Information
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Country and City</h5>
                        <p className="card-text">ID: {student.id}</p>
                        <p className="card-text">Name: {student.firstName}</p>
                        <p className="card-text">Email: {student.email}</p>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-danger" onClick={()=> {setShowDetails(false); setStudent(studentDefaultData)}}>Close</button>
                    </div>
                </div>
            );
        } else {
            return ("");
        }
        
    
    };

    const ShowSpecificDetails = () => {

        console.log("Pressed", showDetails);
        if(showDetails){
            return(
                <div className="card">
                    <div className="card-header bg-info text-white">
                        Student Information
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Country and City</h5>
                        <p className="card-text">ID: {person.id}</p>
                        <p className="card-text">Name: {person.firstName}</p>
                        <p className="card-text">Email: {person.email}</p>
                    </div>
                    <div className="card-footer">
                        <button type="button" className="btn btn-danger" onClick={()=> {setShowDetails(false); setStudent(studentDefaultData)}}>Close</button>
                    </div>
                </div>
            );
        } else {
            return ("");
        }
        
    
    };

    return (
        <div className="container">
            <h3>Person list</h3>
            <br/>
            <table className="table .table-striped">
            <TableHeader />
            <TableRow list={persons} />
            </table>
            
            <ShowSpecificDetails/>
        </div>
    );
};

export default CrudDemo;