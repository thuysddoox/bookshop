import styled from "@emotion/styled";

export function PageTitle(props) {
  return <StyledPageTitle>{props.title}</StyledPageTitle>;
}

export const StyledPageTitle = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.black};
`;
