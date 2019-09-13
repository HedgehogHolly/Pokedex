import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const typeMap = {
  fire: "red"
};

const Type = styled.div`
  width: 12px;
  height: 12px;
  margin: 0 2px;
  background-color: ${props => typeMap[props.name] || "#000"};
`;

Type.propTypes = {
  name: PropTypes.string.isRequired
};

export default Type;
