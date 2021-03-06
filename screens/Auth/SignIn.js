import { StatusBar, KeyboardAvoidingView, Keyboard } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import { isEmail } from "../../utils";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/usersSlice";

const Container = styled.View`
  flex: 1;
  margin-top: 30%;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
`;

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params?.email);
  const [password, setPassword] = useState(params?.password);
  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("All Fields are required!!!");
      return false;
    }
    if (!isEmail(email)) {
      alert("Email is invalid");
      return false;
    }
    return true
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      return 
    }
    dispatch(userLogin({
      username: email, 
      password
    }))
  };
  const dismissKeyboard = () => Keyboard.dismiss();
  return (
    <DismissKeyboard>
      <Container>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView behavior="position">
          <InputContainer>
            <Input
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              stateFn={setEmail}
            />
            <Input
              value={password}
              placeholder="Password"
              isPassword={true}
              stateFn={setPassword}
            />
          </InputContainer>
          <Btn text={"Sign In"} accent onPress={handleSubmit}></Btn>
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
};
