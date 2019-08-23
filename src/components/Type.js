import React from "react";
import styled from "styled-components";
import "./type.css";

const TypeBox = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 2px;
`;

function Type(props) {
  return <TypeBox className={props.name} />;
}

export default Type;
