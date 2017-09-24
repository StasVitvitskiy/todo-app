import React, { Component } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import './app.css';
import TodoItem from './todo-item';
import BottomPanel from './bottom-panel'; 
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
function readFromStorage() {
  try {
    return JSON.parse(localStorage.todos)
  }
  catch(error) {
    return []
  }
}
function saveToStorage(todos) {
  try {
    localStorage.todos = JSON.stringify(todos);
  }
  catch (error){
    
  }
}
function filterAll() {
  return true
}
filterAll.displayName = 'all';
filterActive.displayName = 'active';
filterCompleted.displayName = 'completed';
function filterActive(item) {
  return item.done == false
}
function filterCompleted(item) {
  return item.done == true
}
class App extends Component {
  state = {
    todos:readFromStorage(),
    filter:filterAll
  }
  setState = (nextState) => {
    super.setState(nextState, () => {
      saveToStorage(this.state.todos);
    });
  }
  onKeyPress = (e) => {
    const value = e.nativeEvent.target.value;
    if(e.nativeEvent.keyCode == 13 && value.trim()) {
      e.nativeEvent.target.value = "";
      const todos = this.state.todos;
      this.setState ({
        todos:todos.concat([{
          text:value,
          id: Date.now(),
          done:false
        }])
      })
    }
  }
  toggleAll = (e) => {
    const checked = e.target.checked;
    const todos = this.state.todos;
    this.setState({
      todos:todos.map(item => {
          item.done = checked
        return item;
      })
    })
  }
  toggleItem = (id) => (e) => {
    const todos = this.state.todos;
    this.setState({
      todos:todos.map(item => {
        if(item.id == id) {
          item.done = e.target.checked
        }
        return item;
      })
    })
  }
    removeItem = (id) => (e) => {
    const todos = this.state.todos;
    this.setState({
      todos:todos.filter(item => item.id != id)
    })
  }
  clearCompleted = () => {
    const todos = this.state.todos;
    this.setState({
      todos:todos.filter(item => item.done == false)
    })
  }
  allChecked = () => {
    const todos = this.state.todos;
    return todos.length &&
    todos.every(item => item.done == true)
}
  setFilter = (filterName) => {
    switch(filterName) {
      case 'active':
        this.setState({
          filter:filterActive
        })
        break;
      case 'completed':
      this.setState({
        filter:filterCompleted
      })
      break;
      default:
      this.setState({
        filter:filterAll
      })
    }
  }
  render() {
    return (
      <Centered>
        <Title>Todos</Title>
        <Section>
        <InputWrapper>
          {this.state.todos.length && 
        <CheckAll>
            <Checkbox
            onChange={this.toggleAll}
            checked={this.allChecked()}
            />
        </CheckAll>
            || ''
            }
          <Input 
            onKeyPress={this.onKeyPress}
            placeholder='What needs to be done?'
          />
          </InputWrapper>
          <List>
            {this.state.todos.filter(this.state.filter).map(item => <TodoItem
              text={item.text}
              done={item.done}
              toggleItem={this.toggleItem(item.id)}
              removeItem={this.removeItem(item.id)}
             />)}
          </List>
          <BottomPanel
            filter={this.state.filter.displayName}
            todos={this.state.todos}
            clearCompleted={this.clearCompleted}
            setFilter={this.setFilter}
          />    
        </Section>
      </Centered>
    )
  }
}
const CheckAll = styled.div`
  position:absolute;
  top:15px;
  left:10px;
`
const InputWrapper = styled.div`
  position:relative;
`
const List = styled.ul`
  margin:0;
  padding:0;
  list-style-type:none;
`
const Title = styled.h1`
  color:rgba(175, 47, 47, 0.15);
  font-size:50px;
`
const Centered = styled.div`
  text-align:center;
`
const Input = styled.input`
    padding: 16px 16px 16px 45px;
    min-width:450px;
    width:100%;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    box-sizing:border-box;
`
const Section = styled.section`
  background:#fff;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  display:inline-block;
`
render(<App />, document.getElementById('root'));
