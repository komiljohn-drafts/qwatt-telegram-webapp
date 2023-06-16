import Header from "./index";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "@/test-config/createMockRouter";
import { render } from "@testing-library/react";

describe("About component", () => {
  it("should render Footer component", () => {
    const { asFragment } = render(
      <RouterContext.Provider value={createMockRouter()}>
        <Header />
      </RouterContext.Provider>
    );
    expect(
      asFragment(
        <RouterContext.Provider value={createMockRouter()}>
          <Header />
        </RouterContext.Provider>
      )
    ).toMatchSnapshot();
  });
});
