import { Outlet } from "react-router-dom"
import styled from "styled-components";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 22rem 1fr;
    grid-template-rows: auto 1fr;
    height: 100dvh;
`
const Main = styled.main`
    padding: 1rem;
    overflow-y: auto;`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout