import Heading from "./Heading"
import styled from "styled-components"
const StyledHeader = styled.header`
  background-color: var(--color-brand-700, #3730a3);
  color: var(--color-gray-300, #d1d5db);
  padding: 1rem 2rem;
`;
function Header() {
    return (
        <StyledHeader>
            <Heading as="h1">The Wild Oasis</Heading>
        </StyledHeader>
    )
}

export default Header