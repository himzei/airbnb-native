import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    explore: {
      page: 1,
      rooms: [],
    },
    favs: [],
  },
  reducers: {
    setExploreRooms(state, action) {
      const { explore } = state;
      const { payload } = action;
      if (payload.page === 1) {
        state.explore.rooms = payload.rooms;
        state.explore.page = 1;
      } else {
        payload.rooms.forEach((payloadRoom) => {
          const exists = explore.rooms.find(
            (savedRoom) => savedRoom.id === payloadRoom.id
          );
          if (!exists) {
            explore.rooms.push(payloadRoom);
          }
        });
      }
    },
    increasePage(state, aciton) {
      state.explore.page += 1;
    },
    setFavs(state, action) {
      state.favs = action.payload;
    },
    setFav(state, action) {
      const {
        payload: { roomId },
      } = action;
      const room = state.explore.rooms.find((room) => room.id === roomId);
      if(room){
        if(room.is_favs){
          room.is_favs = false
          state.favs = state.favs.filter(room => room.id !== roomId)
        }else{
          room.is_favs = true
          state.favs = [room, ...state.favs]
        }
      }
    },
  },
});

export const {
  setExploreRooms,
  increasePage,
  setFavs,
  setFav,
} = roomsSlice.actions;

export const getRooms = (page) => async (dispatch, getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    const {
      data: { results },
    } = await api.rooms(page, token);
    dispatch(
      setExploreRooms({
        rooms: results,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export default roomsSlice.reducer;
