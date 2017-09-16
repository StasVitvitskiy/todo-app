import React from 'react';
import styled from 'styled-components';
import RemoveIcon from 'react-icons/lib/md/highlight-remove';
export default function(props) {
  return (
    <Li>
      <View>
      <input
        checked={props.done} type='checkbox'
        onChange={props.toggleItem}
      />
      <Text done={props.done}>
        {props.text}
      </Text>
      <Icon onClick={props.removeItem}>
        <RemoveIcon/>
      </Icon>
      </View>
    </Li>
  )
}
const Icon = styled.div`
  cursor:pointer;
  padding:0 10px;
`
const View = styled.div`
  display:flex;
  align-items:center;
  height: 46px;
`
const Li = styled.li`
  position: relative;
￼  font-size: 14px;
  text-align:left;
  border-bottom: 1px solid #ededed;
`
const Text = styled.div`
  text-decoration: ${(props) => props.done ? 'line-through' : 'none'};
  flex-grow:2;
`