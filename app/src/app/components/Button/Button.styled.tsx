import styled from "styled-components";

export const Button = styled.button<{
  version: string;
  type: string;
  textPosition: string;
}>`
  padding: ${(props: { type: string }) =>
    props.type === "icon" ? "10px" : "10px 20px"};
  background-color: ${(props: { version: string }) =>
    props.version === "primary" ? "black" : "white"};
  color: ${(props: { version: string }) =>
    props.version === "primary" ? "white" : "black"};
  font-family: inherit;
  outline: none;
  width: ${(props: { type: string }) =>
    props.type === "icon" ? "35px" : "auto"};
  height: ${(props: { type: string }) =>
    props.type === "icon" ? "35px" : "auto"};
  text-align: center;
  display: flex;
  justify-content: ${(props: { textPosition: string }) =>
    props.textPosition === "left"
      ? "flex-start"
      : props.textPosition === "right"
      ? "flex-end"
      : "center"};
  align-items: center;
  box-shadow: 0px 0px 5px 3px #0000001c;
  border: 0;
  border-radius: 2px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: ${(props: { version: string }) =>
      props.version === "primary" ? "#333" : "#f8f8f8"};
  }
  &:active {
    transform: scale(0.98);
  }
`;
