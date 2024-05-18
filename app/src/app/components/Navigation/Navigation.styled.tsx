import {
  FaCloudSunRain,
  FaGlobe,
  FaSignInAlt,
  FaSignOutAlt,
  FaWind,
} from "react-icons/fa";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90px;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Menu = styled.div`
  display: flex;
  gap: 5px;
  padding: 20px 0;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
`;

export const GlobeIcon = styled(FaGlobe)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;

export const CloudSunRainIcon = styled(FaCloudSunRain)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;

export const RecommendedIcon = styled(MdOutlineSportsVolleyball)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;

export const SignInIcon = styled(FaSignInAlt)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;
export const SingOutIcon = styled(FaSignOutAlt)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;

export const SettingsIcon = styled(FaGear)`
  color: white;
  height: 48px;
  width: 48px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  transition: 0.3s ease;
  &:hover {
    background-color: #8080806e;
  }
`;
