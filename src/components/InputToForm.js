import React, { useEffect, useState } from 'react';

import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const baseURL= "http://localhost:8080/api/v1/person/";

const InputToForm = () => {

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
    
    const sendPostRequest = async (props) => {
        //const data = {email: 'test.test@test.se', firstName: 'Test12',lastName: 'Test 22', title: 'Test Title'};
        console.log("start sendPostRequest");
        await axios.post(baseURL,props.person.data).then(res => {
            console.log("RESPONSE", res);
            if(res.status === 201){
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR " , err);
            // update error state
            if(err.response){
                console.log("ERROR RESPONSE " , err.response);

                setError(err.response.data.statusText);
            } else {
                setError(err.message);
            }
            setMessage();
        });
        console.log("end sendPostRequest");
    };


    const Form = () => {

        const { register, handleSubmit, formState: {errors} } = useForm();
    
            const saveData = (data) => {
                
                console.log("start sendPostRequest");
                //<sendPostRequest person = {data}/>;
                console.log("start sendPostRequest");
         axios.post(baseURL,data).then(res => {
            console.log("RESPONSE", res);
            if(res.status === 201){
                setPersons(res.data);
                setMessage('Operation is Done!');
            } else {
                setMessage('API ERROR' + res.status);
            }
            setError();
        }).catch(err => {
            console.log("ERROR " , err);
            // update error state
            if(err.response){
                console.log("ERROR RESPONSE " , err.response);

                setError(err.response.data.statusText);
            } else {
                setError(err.message);
            }
            setMessage();
        });
        console.log("end sendPostRequest");
    
                console.log("-dhdhd------------");
                console.log(data);
                console.log("-----dsfhjgjfgkf----------");
                const id = 'A_'+ Math.random().toString(36).substr(2, 9);
                const title = data.title; 
                const skill = { id, title };
                skills.push(skill);
                setLoadData(!loadData); // !false => true
                console.log("SKILLS:" , skills);
            };

            const FormToInput = () => {   
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
                            <button type="submit" className="btn btn-success">Add</button>
                        </div>
                    </div>
                </form> 
            </Fragment>
        );
        };
};

return (
<div className="container">
            <h3>Sign up</h3>
            
            
        </div>
);
};

export default InputToForm;