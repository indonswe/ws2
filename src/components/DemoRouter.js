import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useLocation, Redirect } from "react-router-dom";
import CrudDemo from './CrudDemo';

//import CrudDemo from "./CrudDemo";

//  npm install react-router-dom@5.3.0

// step 1 create component
// step 2 import router
// step 3 Define Router

//<Router> is responsible to create a history object
//<Switch> component is responsible to render only the first child or <Rout> that matches the path
const DemoRouter = () => {
    return (
        <div className="container">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/welcome" component={Welcome} />
                    <Route path="/form" component={RegisterForm} />

                    <Redirect from="/contactUs" to="/about" />
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/cruddemo">
                        <CrudDemo />
                    </Route>

                    <Redirect from="/personInformation/:id" to="/data/:id" />
                    <Route path="/data/:id" component={ShowData} />

                    <Route path="/error" component={ErrorPage} />


                    <Route component={NotFound} />                    
                </Switch>
            </Router>
        </div>
    );
  
};


const Header = () => {
    return (
        <Fragment>
            <ul className="nav nav-pills nav-fill bg-dark text-white">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Welcome</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/person">Person</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/cruddemo">Cruddemo</Link>
                </li>
            </ul>
        </Fragment>
    );
};


const Home = () => {
    // useHistory allows developer access to the React Routers history object
    const history = useHistory();

    return (
        <Fragment>
            Home Page
            <br/>
            <a href="#" className="btn btn-outline-danger" onClick={() => history.goBack()} >Back</a>
            <a href="#" className="btn btn-outline-primary" onClick={() => history.push('/about')} >Redirect to About Us</a>
        </Fragment>
    );
};

const Welcome = () => {
    return (
        <Fragment>
            Welcome Page
        </Fragment>
    );
};

const About = () => {
    return (
        <Fragment>
            About Us Page
        </Fragment>
    );
};

const Person = () => {
  return (
      <Fragment>
          The person page
      </Fragment>
  );
};

const NotFound = () => {
    return (
        <Fragment>
            Page Noy Found
        </Fragment>
    );
};


const RegisterForm = () => {
    const [id,setId] = useState(0);
    const history = useHistory();

    const redirectToData = () => {
        //const data = {id: id, name: 'Test Test'};
         history.push('/data/' + id);
    };
    
    return (
        <Fragment>
            <div className="row">
                <div className="col-6">
                    <input type="text" name="id" onChange={(e) => setId(e.target.value)} className="form-control" placeholder="Enter A Number" />
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-info" onClick={redirectToData} >Submit</button>
                </div>
            </div>
        </Fragment>
    );
};


const ShowData = () => {
    let params = useParams();
    //const location = useLocation();
    const [id,setId] = useState();
    const [person,setPerson] = useState({id: 0, name:''});

    useEffect(()=> {
        setId(params.id);
        // you can call API 
        //console.log(location.state);
        //setPerson({id: location.state.id, name: location.state.name});
    }, []);

    if(id == 0){
        // redirect to error page
        return <Redirect to={
            {
                pathname: "/error",
                state: {message: "Param is not Valid!"}
            }
        } />;
    }

    return (<b>Id Number is: {id}</b>);
};


const ErrorPage = () => {
    const location = useLocation();
    return(<b>Error: {location.state.message}</b>);
};

export default DemoRouter;







 

