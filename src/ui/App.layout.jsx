import { Outlet } from "react-router-dom"
import styled from "styled-components";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const Main = styled.main`
    padding: 1rem;
    margin-left: 250px;`;

function AppLayout() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Main>
                <Outlet />
            </Main>
        </div>
    )
}

export default AppLayout