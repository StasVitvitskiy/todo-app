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
          <div onClick={() => props.setFilter('all')}>
            All 
          </div>
          <div onClick={() => props.setFilter('active')}>
            Active
          </div>
          <div onClick={() => props.setFilter('completed')}>
            Completed
          </div>
        </Filters>
        {(todosCompleted(props.todos)).length && 
        <PanelItem onClick={props.clearCompleted}>
          Clear completed
        </PanelItem> || ''}
      </BottomPanel>
    )
  } else {
    return null
  }
}
const BottomPanel = styled.div`
  display:flex;
  padding: 10px 0;
`
const Filters = styled.div`
  div {
      padding:0 5px;
  }
  padding:0 25px;
  display:flex;
`
const PanelItem = styled.div`
  padding:0 5px;
`