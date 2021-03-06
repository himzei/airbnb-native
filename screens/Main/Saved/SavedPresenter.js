import React from "react";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
  margin-top: 80px;
  padding: 0 15px;
`;

const SV = styled.ScrollView``;

const Title = styled.Text`
  font-size: 36px;
  margin-bottom: 10px;
`;

const NoFavs = styled.Text``;

export default ({ rooms }) => (
  <Container>
    <Title>Favourites</Title>
    <SV
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      {rooms.length !== 0 ? (
        rooms.map((room) => (
          <RoomCard
            price={room.price}
            key={room.id}
            name={room.name}
            id={room.id}
            isFav={room.is_fav}
            photos={room.photos}
            isSuperHost={room.user.superhost}
          />
        ))
      ) : (
        <NoFavs>You Don't have Favs</NoFavs>
      )}
    </SV>
  </Container>
);
