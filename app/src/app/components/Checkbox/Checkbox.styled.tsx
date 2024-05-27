import styled from "styled-components";

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    display: none;
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: #333;
  }

  label::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    margin-right: 10px;
    background-color: white;
    transition: background-color 0.2s;
  }

  input:checked + label::before {
    background-color: #000000;
    border-color: #000000a0;
    box-shadow: 0px 0px 5px 3px #00000021;
  }

  label::after {
    content: "";
    position: absolute;
    display: none;
    top: 3px;
    left: 7.5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input:checked + label::after {
    display: block;
  }
`;
