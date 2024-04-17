import styled from "styled-components";

export const Typography = styled.div.attrs<{ tag: any }>((props) => ({
  as: props.tag,
}))`
  font-size: ${({ tag }) => {
    switch (tag) {
      case "h1":
        return "40px";
      case "h2":
        return "25px";
      default:
        return "1em";
    }
  }};
  font-weight: ${({ tag }) => {
    switch (tag) {
      case "h1":
        return "700";
      case "h2":
        return "400";
      default:
        return "400";
    }
  }};
`;
