import React, { useEffect } from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import RoomPhotos from "../../components/RoomPhotos";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import utils from "../../utils";

const Container = styled.ScrollView``;
const DataContainer = styled.View`
  padding: 0 20px;
`;
const Address = styled.Text`
  margin-top: 10px;
  font-size: 24px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;

const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
`;

const CheckContainer = styled.View`
  margin-top: 40px;
`;

const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckTitle = styled.Text`
  font-size: 10px;
`;

const CheckTime = styled.Text`
  margin-top: 10px;
`;

const MapContainer = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 20px;
`;

function formatQtt(number, name) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

function formatTime(time) {
  const [hours, min, sec] = time.split(":");
  return `${hours}:${min}`;
}

export default ({ route: { params }, navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />
      <DataContainer>
        <Address>{params.address} / {params.price}</Address>
        <PropertyInfoContainer>
          <PropertyInfoData>
            <PropertyInfoText>{formatQtt(params.beds, "bed")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQtt(params.bedrooms, "bedroom")}
            </PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQtt(params.bathrooms, "bathroom")}
            </PropertyInfoText>
          </PropertyInfoData>
        </PropertyInfoContainer>
        <CheckContainer>
          <CheckTitleContainer>
            <Ionicons name={utils.isAndroid() ? "ios-timer" : "md-timer"} />
            <CheckTitle>Check-in / check-out</CheckTitle>
          </CheckTitleContainer>
          <CheckTitleContainer>
            <CheckTime>
              {formatTime(params.check_in)} / {formatTime(params.check_out)}
            </CheckTime>
          </CheckTitleContainer>
        </CheckContainer>
        <MapContainer>
          <MapView
            zoomEnabled={true}
            camera={{
              center: {
                latitude: parseFloat(params.lat),
                longitude: parseFloat(params.lng),
              },
              altitude: 10 * 200,
              pitch: 50,
              heading: 0,
            }}
            scrollEnabled={false}
            style={{ height: "100%", width: "100%" }}
          >
            <Marker coordinate={{
              longitude: parseFloat(params.lng), 
              latitude: parseFloat(params.lat)
            }} />
          </MapView>
        </MapContainer>
      </DataContainer>
    </Container>
  );
};
