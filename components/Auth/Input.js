import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";



const { width } = Dimensions.get("screen");

const Container = styled.TextInput`
  width: ${width / 1.5}px;
  padding: 10px 20px;
  border: 1px solid ${(props) =>
      props.accent ? "transparent" : "grey"}
    background-color: white; 
    border-radius: 30px;
    margin-bottom: 10px;
    font-weight: 500;
`;

const Input = ({
  value,
  placeholder,
  isPassword = false,
  autoCapitalize,
  stateFn,
}) => (
  <Container
    value={value}
    placeholder={placeholder}
    secureTextEntry={isPassword ? true : false}
    autoCapitalize={autoCapitalize}
    onChangeText={(text) => stateFn(text)}
  />
);

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  isPassword: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  stateFn: PropTypes.func.isRequired,
};

export default Input;
