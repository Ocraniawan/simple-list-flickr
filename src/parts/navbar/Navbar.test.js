import { render, fireEvent } from "@testing-library/react";
import Navbar from './Navbar'

describe('SearchRenderCheck', () => {
    it('SearchCheck', () => {
        const { queryByTitle } = render(<Navbar />);
        const input = queryByTitle("search")
        expect(input).toBeTruthy()
    });
    it("onChange", () => {
        const { queryByTitle } = render(<Navbar />);
        const input = queryByTitle("search")
        fireEvent.change(input, { target: { value: "cat" } })
        expect(input.value).toBe("cat")
    })
})