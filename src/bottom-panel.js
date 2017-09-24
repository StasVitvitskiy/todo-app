import React from 'react';
import styled from 'styled-components';
function todosLeft(todos) {
  return (
    todos.filter(item => item.done == false)
  )
}
function todosCompleted(todos) {
  return (
    todos.filter(item => item.done == true)
  )
}
export default function(props) {
  if(props.todos.length) {
    return (
      <BottomPanel>
        <PanelItem>
        {(todosLeft(props.todos)).length} items left
        </PanelItem>
        <Filters>
          <Filter 
            onClick={() => props.setFilter('all')} 
            active={props.filter=='all'}
            >
            All 
          </Filter>
          <Filter 
            onClick={() => props.setFilter('active')}
            active={props.filter=='active'}
            >
            Active
          </Filter>
          <Filter 
            onClick={() => props.setFilter('completed')}
            active={props.filter=='completed'}
            >
            Completed
          </Filter>
        </Filters>
        {(todosCompleted(props.todos)).length && 
        <Clear 
          onClick={props.clearCompleted}>
          Clear completed
        </Clear> || ''}
      </BottomPanel>
    )
  } else {
    return null
  }
}
const BottomPanel = styled.div`
  display:flex;
  padding: 10px 0;
  justify-content:space-around;
`
const Filters = styled.div`
  padding:0 25px;
  display:flex;
  flex-grow:2;
`
const PanelItem = styled.div`
  padding-left:10px;
  padding-right:50px; 
`
const Clear = styled.div`
  cursor:pointer;
  padding-right:10px;
  :hover {
    border-bottom:1px solid;
    }
`
const Filter = styled.div`
  margin:0 5px;
  cursor:pointer;
  padding:0 5px;
  border: 1px solid ${(props) => props.active ? 'rgba(175, 47, 47, 0.2)' : 'white'};
  border-radius: 3px;
  :hover {
    text-decoration: none;
    border: 1px solid rgba(175, 47, 47, 0.2);
  }
`