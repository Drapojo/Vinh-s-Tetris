import { useNavigate, useSearchParams } from "react-router-dom";
import { useLoginMutation } from "../services/login.ts";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth.ts";

const HandleSSO = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [login] = useLoginMutation();
  const toast = useToast();
  const { login: addToken } = useAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;

    login(code)
      .unwrap()
      .then((response) => {
        if (response.accessToken) {
          addToken(response.accessToken);
        }
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Something went wrong",
          description: err.message || "Login failed",
          isClosable: true,
          duration: 3000
        });
      })
      .finally(() => {
        navigate("/");
      });
  }, [searchParams, login, navigate, toast]);

  return null;
};

export default HandleSSO;
