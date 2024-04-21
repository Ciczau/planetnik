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
      case "h3":
        return "20px";
      case "h4":
        return "15px";
      case "h5":
        return "12px";
      case "h6":
        return "9px";
      default:
        return "1em";
    }
  }};
  font-weight: ${({ tag }) => {
    switch (tag) {
      case "h1":
        return "700";
      default:
        return "400";
    }
  }};
`;
