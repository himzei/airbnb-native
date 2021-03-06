import React from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
import Btn from "../../../components/Auth/Btn";
import Input from "../../../components/Auth/Input";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  margin-top: 30%;
  justify-content: center;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 30px;
  margin-top: 100px;
`;

export default ({
    firstName, 
    setFirstName, 
    lastName, 
    setLastName, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loading, 
    handleSubmit
}) => (
  <DismissKeyboard>
    <Container>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior="position">
        <InputContainer>
          <Input
            value={firstName}
            placeholder="First Name"
            autoCapitalize="words"
            stateFn={setFirstName}
          />
          <Input
            value={lastName}
            placeholder="Last Name"
            autoCapitalize="words"
            stateFn={setLastName}
          />
          <Input
            keyboardType={"email-address"}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            stateFn={setEmail}
          />
          <Input
            value={password}
            placeholder="Password"
            isPassword={true}
            stateFn={setPassword}
          />
        </InputContainer>
        <Btn
          loading={loading}
          text={"Sign Un"}
          accent
          onPress={handleSubmit}
        ></Btn>
      </KeyboardAvoidingView>
    </Container>
  </DismissKeyboard>
);
