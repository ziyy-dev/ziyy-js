import { expect, test } from "vitest";
import { style } from "../index";

test("style", () => {
  expect(style("<s>Deleted")).toBe("\x1b[9mDeleted\x1b[29m");
});
