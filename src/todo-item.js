import React from 'react';
import styled from 'styled-components';
import RemoveIcon from 'react-icons/lib/md/highlight-remove';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
export default function(props) {
  return (
    <Li>
      <View>
      <Checkbox
        checked={props.done}
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
};
const Icon = styled.div`
  cursor:pointer;
  padding:0 10px;
`
const View = styled.div`
  display:flex;
  align-items:center;
  height: 46px;
  padding-left:10px;
`
const Li = styled.li`
  position: relative;
￼  font-size: 14px;
  text-align:left;
  border-bottom: 1px solid #ededed;
`
const Text = styled.div`
  text-decoration: ${(props) => props.done ? 'line-through' : 'none'};
  margin-left:3%;
  font-size:20px;
  flex-grow:2;
`