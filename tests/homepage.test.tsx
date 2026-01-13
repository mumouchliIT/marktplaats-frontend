import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "../src/pages/HomePage";

vi.mock("../src/services/api", () => ({
  api: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    post: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
}));

vi.mock("../src/services/analytics", () => ({
  track: vi.fn(),
}));

test("HomePage renders without crashing", () => {
  render(<HomePage />);
  expect(
    screen.getByRole("heading", { name: /listing service ui/i })
  ).toBeInTheDocument();
});
