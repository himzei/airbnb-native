import { StatusBar } from "expo-status-bar";
import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Btn from "../components/Auth/Btn";

const Container = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  position: absolute;
  z-index: -1;
  top: 0;
`;

const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

const BtnContainer = styled.View`

`;

export default ({ navigation }) => {
  const goToSignUp = () => navigation.navigate("SignUp")
  const goToSignIn = () => navigation.navigate("SignIn")
  return (
    <Container>
      <BlurView
        tint="light"
        intensity={70}
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center", 
        }}
      >
        <Logo source={require("../assets/logo2.png")} />
        <BtnContainer>
          <Btn onPress={goToSignUp} text={"Sing Up"} accent={true} />
          <Btn onPress={goToSignIn} text={"Sign In"} accent={false} />
        </BtnContainer>
      </BlurView>
      <Image source={require("../assets/loginBg.jpeg")} />
      <StatusBar barStyle="light-content" />
    </Container>
  );
};
