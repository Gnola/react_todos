import React, { Component } from 'react'; // OR import React from 'react';
// import logo from './logo.svg'; // DELETED
import './App.css';

// COMPONENTS
import Todos from './components/Todos.js';
import AddTodo from './components/AddTodo.js';

// FUNCTIONAL COMPONENTS
import Header from './components/layout/Header.js';
import About from './components/pages/About.js';

// OTHER FUNCTIONALITY
import { BrowserRouter as Router, Route } from 'react-router-dom'; // npm i react-router-dom --> For adding About page to different route
import axios from 'axios'; // npm i axios --> API Call

class App extends Component { //  class App extends React.Component
    state = {
      todos: []
    }

    // On Load
    componentDidMount() {
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10') // Call the API
      .then(res => this.setState({
        todos:res.data // set State
      }))
    }

    // Toggle Complete
    markComplete = (id) => {
      this.setState({
        todos:this.state.todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo;
        })
      })
    }

    // Add Todo WITH AXIOS
    addTodo = (title) => {
      axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed:false
      }).then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }))
    }

    // OG Add Todo - with hard coded todos
    // addTodo = (title) => {
    //   const newTodo = {
    //     id: Math.floor(Math.random() * 100) + 3,
    //     title,
    //     completed: false
    //   }
    //   this.setState({
    //     todos: [...this.state.todos, newTodo]
    //   })
    // }

    // Delete Todo WITH AXIOS
    delTodo = (id) => {
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      }))
    }

    // OG Delete Todo - with hard coded todos
    // delTodo = (id) => {
    //   this.setState({
    //     todos: [...this.state.todos.filter(todo => todo.id !== id)]
    //   })
    // }

    render() {
      return (
        <Router>
          <div className='App'>
            <div className='container'>
              <Header />
              <Route exact path='/' render={props => (
                  <React.Fragment>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
                  </React.Fragment>
                )} />
              <Route path='/about' component={About} />
            </div>
          </div>
        </Router>
      );
    }
}

export default App;
