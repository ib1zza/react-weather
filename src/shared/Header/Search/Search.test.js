import { fireEvent, render, screen } from "@testing-library/react";
import Search from "./Search";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const onChange = jest.fn();

describe("search component test", function () {
  it("placeholder text visible", () => {
    render(<Search onChange={() => {}} />);

    const likeElement = screen.getByPlaceholderText(/поиск/i);
    expect(likeElement).toBeInTheDocument();
  });

  it("should match snapshot", function () {
    const el = render(<Search onChange={() => {}} />);

    expect(el).toMatchSnapshot();
  });

  it("onChange function works", function () {
    const el = render(<Search onChange={() => {}} />);
    userEvent.type(screen.getByRole("textbox"), "mysearchstring");
    expect(screen.queryByDisplayValue(/mysearchstring/i)).toBeInTheDocument();
    expect(el).toMatchSnapshot();
  });

  it("onChange works", function () {
    render(<Search onChange={() => {}} />);
    expect(screen.queryByText(/react/i)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "react" },
    });
    expect(screen.queryByDisplayValue(/react/i)).toBeInTheDocument();
  });
});
