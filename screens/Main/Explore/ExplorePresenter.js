import React from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ rooms }) => {
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color="black" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 120 }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {rooms.map((room) => (
            <RoomCard
              price={room.price}
              key={room.id}
              name={room.name}
              id={room.id}
              isFav={room.is_fav}
              photos={room.photos}
              isSuperHost={room.user.superhost}
            />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};
