import styled from 'styled-components'
const StyledSidebar = styled.aside`background-color: var(--color-brand-400); color: black;`
function Sidebar() {
    return (
        <StyledSidebar>
            <p>sidebar</p>
        </StyledSidebar>
    )
}

export default Sidebar