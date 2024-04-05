import {RootState} from "../index";

export const selectTransportationQueryParams = (state: RootState) => state.transportationQueryParams;
export const selectServerId =  (state: RootState) => state.transportationQueryParams.serverId;