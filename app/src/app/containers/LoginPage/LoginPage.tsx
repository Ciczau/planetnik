import LoginRegister from "@/app/sections/LoginRegister/LoginRegister";
import { useState } from "react";

const LoginPage = () => {
  const [type, setType] = useState<"login" | "register">("login");
  return <LoginRegister type={type} updateType={(type) => setType(type)} />;
};

export default LoginPage;
