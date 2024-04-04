import {RootState} from "../index";

export const selectTransportation = (state: RootState) => state.transportation;
export const selectServerId =  (state: RootState) => state.transportation.serverId;