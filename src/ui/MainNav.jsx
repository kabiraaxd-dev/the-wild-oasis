import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { HiOutlineHome, HiOutlineUserCircle, HiOutlineCalendarDays, HiOutlineCog6Tooth } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1rem;

    color: var(--color-grey-600, #4b5563);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem 0.6rem;
    text-decoration: none;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800, #1f2937);
    background-color: var(--color-grey-50, #eef2ff);
    border-radius: var(--border-radius-sm, 5px);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-500, #6b7280);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600, #4f46e5);
  }
`;
function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/booking">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHome />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUserCircle />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export { MainNav, NavList, StyledNavLink };