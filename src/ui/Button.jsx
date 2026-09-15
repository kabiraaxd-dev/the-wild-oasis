import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.325rem;
    padding: 0.6rem 1.2rem;
    text-transform: uppercase;
    font-weight: 400;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variants = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100, #e0bbbb);
    background-color: var(--color-red-700, #b00020);

    &:hover {
      background-color: var(--color-red-800, #d33737);
      color: white;
    }
  `,
};

const Button = styled.button`
  border: 0 none;
  cursor: pointer;border-radius: 0.5rem;
  ${props => sizes[props.size || "medium"]}
  ${props => variants[props.variant || "primary"]}
`;
export default Button;