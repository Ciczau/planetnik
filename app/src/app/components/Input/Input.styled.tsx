import styled from "styled-components";

export const Input = styled.input<{
  version?: "primary" | "secondary";
  width?: number;
  border?: boolean;
}>`
  padding: 15px;
  border: none;
  box-shadow: ${(props) =>
    !props.border ? "1px 3px 5px rgba(0, 0, 0, 0.25)" : "none"};
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  background-color: ${(props) =>
    props.version === "primary" ? "white" : "black"};
  color: ${(props) => (props.version === "primary" ? "black" : "white")};
  border: ${(props) => (props.border ? "1px solid black" : "none")};
`;
