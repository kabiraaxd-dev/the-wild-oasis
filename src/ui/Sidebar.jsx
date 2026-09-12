// import { NavLink } from "react-router-dom";
import Logo from "./Logo"
import { MainNav} from "./MainNav"
// import { Link } from 'react-router-dom';
import styled from 'styled-components'
const StyledSidebar = styled.aside`
  font-family: var(--font-family-sans-serif, "Poppins", "Inter", sans-serif);
  background: var(--color-brand-200, #c7d2fe);
  color: var(--color-white, white);
  padding: 1rem 1.5rem;
  border-right: 1px solid var(--color-brand-600, #4f46e5);
  grid-row: 1 / -1;
`;
function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <br/>
            
            <MainNav />
            
        </StyledSidebar>
    )
}

export default Sidebar