import {
  FaCloudSunRain,
  FaGlobe,
  FaSignInAlt,
  FaSignOutAlt,
  FaWind,
} from "react-icons/fa";
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
  gap: 28px;
  padding: 20px 0;
  margin-top: 100px;
  flex-direction: column;
  align-items: center;
`;

export const GlobeIcon = styled(FaGlobe)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;

export const CloudSunRainIcon = styled(FaCloudSunRain)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;

export const WindIcon = styled(FaWind)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;

export const SignInIcon = styled(FaSignInAlt)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;
export const SingOutIcon = styled(FaSignOutAlt)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;

export const SettingsIcon = styled(FaGear)`
  color: white;
  height: 28px;
  width: 28px;
  cursor: pointer;
`;
