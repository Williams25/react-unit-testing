import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { List } from "./index";

describe("<List />", () => {
  it("should render list items", async () => {
    const { getByText, rerender, queryByText, unmount } = render(
      <List items={["a", "b", "c"]} />
    );

    expect(getByText("Lista")).toHaveAttribute("class", "teste");
    expect(getByText("a")).toBeInTheDocument();
    expect(getByText("b")).toBeInTheDocument();
    expect(getByText("c")).toBeInTheDocument();

    unmount();

    rerender(<List items={["d", "e", "f"]} />);
    expect(getByText("d")).toBeInTheDocument();
    expect(queryByText("a")).not.toBeInTheDocument();
  });

  it("should be able to add new item the list", async () => {
    const { debug, getByPlaceholderText, getByText } = render(
      <List items={["a", "b", "c"]} />
    );

    debug();

    const inputElement = getByPlaceholderText("Novo item");
    userEvent.type(inputElement, "teste novo");

    const addButton = getByText("adicionar");
    userEvent.click(addButton);

    debug();

    await waitFor(() => {
      expect(getByText("teste novo")).toBeInTheDocument();
    });
  });

  it("should be able to remove item from list", async () => {
    const { debug, getAllByText, getByText, queryByText } = render(
      <List items={["a", "b", "c"]} />
    );

    debug();

    const removeButtons = getAllByText("remover");
    userEvent.click(removeButtons[0]);

    debug();

    // await waitForElementToBeRemoved(() => {
    //   return getByText("a");
    // });

    await waitFor(() => {
      expect(queryByText("a")).not.toBeInTheDocument();
    });
  });
});
