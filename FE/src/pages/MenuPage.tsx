import { appConfigs } from "../configs/app";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router";

const Menu = () => {
  const { isLoggedIn, logout, currentUser } = useAuth();

  const logoutHandler = () => {
    logout();
  };
  return (
    <>
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
            as={Link}
            to={"/play"}
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
          >
            Play Game
          </Button>
          <Button
            as={Link}
            to={"/leaderboard"}
            w="full"
            color="white"
            fontFamily="'Press Start 2P', cursive"
            bgGradient="linear(to-r, purple.500, pink.500)"
            _hover={{
              bgGradient: "linear(to-r, purple.400, pink.400)",
              transform: "scale(1.05)",
              boxShadow: "0px 0px 10px rgba(255, 0, 255, 0.5)",
            }}
            transition="all 0.2s ease-in-out"
          >
            Leaderboards
          </Button>
          {!isLoggedIn() && (
            <Button
              as={Link}
              to={"/login"}
              w="full"
              color="white"
              fontFamily="'Press Start 2P', cursive"
              bgGradient="linear(to-r, orange.500, red.500)"
              _hover={{
                bgGradient: "linear(to-r, orange.400, red.400)",
                transform: "scale(1.05)",
                boxShadow: "0px 0px 10px rgba(255, 100, 0, 0.5)",
              }}
              transition="all 0.2s ease-in-out"
            >
              Login/Signup
            </Button>
          )}
          {isLoggedIn() && (
            <>
              <Button
                as={Link}
                to={"/history"}
                w="full"
                color="white"
                fontFamily="'Press Start 2P', cursive"
                bgGradient="linear(to-r, yellow.500, orange.500)"
                _hover={{
                  bgGradient: "linear(to-r, yellow.400, orange.400)",
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 10px rgba(255, 200, 0, 0.5)",
                }}
                transition="all 0.2s ease-in-out"
              >
                History
              </Button>

              {currentUser?.email === appConfigs.adminEmail && (
                <Button
                  as={Link}
                  to={"/admin"}
                  w="full"
                  color="white"
                  fontFamily="'Press Start 2P', cursive"
                  bgGradient="linear(to-r, teal.500, blue.500)"
                  _hover={{
                    bgGradient: "linear(to-r, teal.400, blue.400)",
                    transform: "scale(1.05)",
                    boxShadow: "0px 0px 10px rgba(0, 200, 255, 0.5)",
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  Admin
                </Button>
              )}

              <Button
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
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </>
  );
};
export default Menu;
