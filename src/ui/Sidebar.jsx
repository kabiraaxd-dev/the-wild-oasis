import { NavLink } from "react-router-dom";
import Logo from "./Logo"
import { NavList} from "./MainNav"
// import { Link } from 'react-router-dom';
import styled from 'styled-components'
const StyledSidebar = styled.aside`
  background: var(--color-brand-500, #6366f1);
  color: var(--color-white, white);
  padding: 1rem 1.5rem;
  border-right: 1px solid var(--color-brand-600, #4f46e5);
  grid-row: 1 / -1;
`;
function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <p>sidebar</p>
            <nav>

            <NavList>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/booking">Bookings</NavLink></li>
                <li><NavLink to="/cabins">Cabins</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
            </NavList>
            </nav>
        </StyledSidebar>
    )
}

export default Sidebar