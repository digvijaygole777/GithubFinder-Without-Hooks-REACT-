import React,{Component, Fragment} from 'react';
import Navbar from './components/layouts/Navbar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layouts/Alert'
import About from './components/pages/About'
import User from './components/users/User'
import './App.css';


class App extends Component {
 
  state={
    users:[],
    user:{},
    loading:false,
    alert:null,
    repos:[]
  }



  searchUsers=async text=>{

  const res=await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
  client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  this.setState({users:res.data.items,loading:false})
   
  }

  getUser=async(username)=>{
    const res=await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    
    this.setState({user:res.data})
    console.log(res.data)

  }

  clearUsers=()=>{
    this.setState({users:[],loading:false})
  }

  setAlert=(msg,type)=>{
    this.setState({alert:{msg:msg,type:type}})
    setTimeout(()=>{
      this.setState({alert:{msg:''}},5000)
    })
  }

  getUsersRepos=async(username)=>{
    const res=await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({repos:res.data})
    console.log(res.data)
  }
  
  
 
  render(){
    const {users,user,loading,repos}=this.state
    return (
      <Router>
      <div className="App">
      <Navbar title='Github Finder'/>
      <div className='container'>
        <Alert alert={this.state.alert}/>
        <Switch>
          <Route exact path='/' render={props=>(
            <Fragment>
             <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
        showClear={users.length>0?true:false}
        setAlert={this.setAlert}/>
      <Users loading={loading} users={users}/>
            </Fragment>
          )}/>

          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props=>(
            <User {...props} 
            getUser={this.getUser}
            getUsersRepos={this.getUsersRepos}
            repos={repos}
            user={user}/>
          )}/>
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
 
}

export default App;
