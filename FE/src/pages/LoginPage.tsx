import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router";
import {GOOGLE_LOGIN_URL} from "../configs/sso.ts";

const LoginPage = () => {
  const loginGoogle = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };
  return (
    <Box
      bg="linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 50, 0.7))"
      borderRadius="lg"
      p={10}
      w="450px"
      mx="auto"
      mt="100px"
      textAlign="center"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.5)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.2)"
    >
      <Text
        fontFamily="'Press Start 2P', cursive"
        fontSize="3xl"
        fontWeight="bold"
        color="cyan.300"
        mb={6}
      >
        Vinh's Tetris
      </Text>
      <VStack spacing={4}>
        <Button
          w="full"
          color="white"
          fontFamily="'Press Start 2P', cursive"
          bgGradient="linear(to-r, cyan.500, blue.500)"
          _hover={{
            bgGradient: "linear(to-r, cyan.400, blue.400)",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.5)",
          }}
          transition="all 0.2s ease-in-out"
          onClick={loginGoogle}
        >
          <Text py={3}>Login with Google</Text>
        </Button>
        <Button
          w="full"
          color="white"
          fontFamily="'Press Start 2P', cursive"
          bgGradient="linear(to-r, gray.900, gray.700)"
          _hover={{
            bgGradient: "linear(to-r, gray.800, gray.600)",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(100, 100, 100, 0.5)",
          }}
          transition="all 0.2s ease-in-out"
        >
          Login with GitHub
        </Button>
        <Button
          as={Link}
          to={"/"}
          w="full"
          color="white"
          fontFamily="'Press Start 2P', cursive"
          bgGradient="linear(to-r, red.500, darkred)"
          _hover={{
            bgGradient: "linear(to-r, red.400, darkred)",
            transform: "scale(1.05)",
            boxShadow: "0px 0px 10px rgba(255, 0, 0, 0.5)",
          }}
          transition="all 0.2s ease-in-out"
        >
          Back to Menu
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
