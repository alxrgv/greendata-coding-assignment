import { positionsAdapter } from "./positions";

export const {
  selectById: selectPositionById,
  selectAll: selectAllPositions,
} = positionsAdapter.getSelectors();
