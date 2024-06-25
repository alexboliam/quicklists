import { Guid } from "guid-typescript";

export const GuidHelper = {
  CreateGuid(length = 8) {
    return Guid.create().toString().slice(0, length);
  }
};