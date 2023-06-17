import { Action } from "@/types/ritho";

export class InvalidActionError extends Error {
  name = "InvalidActionError";
  constructor(action: Action) {
    super(`Invalid action: ${action.type}`);
  }
}
