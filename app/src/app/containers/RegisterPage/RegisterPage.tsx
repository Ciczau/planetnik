import LoginRegister from "@/app/sections/LoginRegister/LoginRegister";
import { useState } from "react";

const RegisterPage = () => {
  const [type, setType] = useState<"login" | "register">("register");
  return <LoginRegister type={type} updateType={(type) => setType(type)} />;
};

export default RegisterPage;
