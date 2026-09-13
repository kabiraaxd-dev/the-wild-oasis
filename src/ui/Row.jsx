import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  ${props => props.type === "horizontal" && css`
    flex-direction: row;
  `}
  ${props => props.type === "vertical" && css`
    flex-direction: column;
  `}
  ${props => props.gap && css`
    gap: ${props.gap};
  `}
`;

Row.defaultProps = {
  type: "horizontal"
};

export default Row;