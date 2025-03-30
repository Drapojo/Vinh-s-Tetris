import Tetris from "react-tetris";
import { Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAddHistoryMutation } from "../services/history.ts";
import { CreateHistories } from "../type/Histories.ts";
import { useAuth } from "../hooks/useAuth.ts";

const PlayPage = () => {
  const { isLoggedIn } = useAuth();
  const [addHistory] = useAddHistoryMutation();
  const [gameState, setGameState] = useState<CreateHistories>({
    Lines: 0,
    Points: 0,
    Time: 0,
    Level: 0,
  });
  const [playState, setPlayState] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(0);
  const [points, setPoints] = useState(0);
  const [linesCleared, setLinesCleared] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (playState === "PLAYING") {
      setTime(0);
      if (intervalRef.current === null) {
        intervalRef.current = window.setInterval(() => {
          setTime((prev) => prev + 1);
        }, 1000);
      }
    } else if (playState === "LOST") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (isLoggedIn()) {
        addHistory({ ...gameState, Time: time });
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [playState]);

  useEffect(() => {
    setGameState((prevState) => ({
      ...prevState,
      Level: level,
      Points: points,
      Lines: linesCleared,
    }));
  }, [level, points, linesCleared]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 300);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Text
        fontSize="5xl"
        color="white"
        fontFamily="'Press Start 2P', cursive"
        mb={4}
      >
        Tetris
      </Text>

      <Tetris
        keyboardControls={{
          down: "MOVE_DOWN",
          left: "MOVE_LEFT",
          right: "MOVE_RIGHT",
          space: "HARD_DROP",
          z: "FLIP_COUNTERCLOCKWISE",
          x: "FLIP_CLOCKWISE",
          up: "FLIP_CLOCKWISE",
          p: "TOGGLE_PAUSE",
          c: "HOLD",
          shift: "HOLD",
        }}
      >
        {({
          HeldPiece,
          Gameboard,
          PieceQueue,
          points,
          linesCleared,
          state,
          controller,
          level,
        }) => {
          if (state !== playState) setPlayState(state);
          setLevel(level);
          setPoints(points);
          setLinesCleared(linesCleared);

          return (
            <Flex
              alignItems="flex-start"
              gap={5}
              className={`game-container ${isShaking ? "shake" : ""}`}
            >
              <Flex
                height={"100%"}
                flexDirection="column"
                justifyContent={"space-between"}
                alignItems="end"
              >
                <Box
                  bg="blackAlpha.800"
                  border="2px solid white"
                  borderRadius="md"
                  p={1}
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="white"
                    textAlign="right"
                    fontFamily="'Press Start 2P', cursive"
                  >
                    HOLD
                  </Text>
                  <HeldPiece />
                </Box>

                <VStack
                  align="end"
                  spacing={1}
                  color="white"
                  fontSize="sm"
                  fontFamily="'Press Start 2P', cursive"
                >
                  <Text>LEVEL</Text>
                  <Text fontSize="lg">{level}</Text>
                  <Text>LINES</Text>
                  <Text fontSize="lg">{linesCleared}</Text>
                  <Text>TIME</Text>
                  <Text fontSize="lg">{time}</Text>
                </VStack>
              </Flex>

              <Box
                bg="blackAlpha.700"
                border="2px solid white"
                position="relative"
              >
                <Gameboard />
              </Box>

              <Flex flexDirection="column" alignItems="center">
                <Box
                  bg="blackAlpha.800"
                  border="2px solid white"
                  p={2}
                  borderRadius="md"
                  mb={2}
                >
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="white"
                    textAlign="left"
                    fontFamily="'Press Start 2P', cursive"
                  >
                    NEXT
                  </Text>
                  <PieceQueue />
                </Box>

                <VStack
                  width={"100%"}
                  align="start"
                  spacing={1}
                  color="white"
                  fontSize="sm"
                  fontFamily="'Press Start 2P', cursive"
                >
                  <Text>SCORE</Text>
                  <Text fontSize="lg">{points}</Text>
                </VStack>
              </Flex>
              {state === "LOST" && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  bg="blackAlpha.800"
                  p={6}
                  borderRadius="md"
                  textAlign="center"
                >
                  <VStack spacing={4}>
                    <Text
                      fontSize="3xl"
                      color="white"
                      fontFamily="'Press Start 2P', cursive"
                    >
                      Game Over
                    </Text>
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
                      onClick={controller.restart}
                    >
                      Restart
                    </Button>
                    {isLoggedIn() && (
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
                    )}
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
                      Menu
                    </Button>
                  </VStack>
                </Box>
              )}
            </Flex>
          );
        }}
      </Tetris>
    </>
  );
};

export default PlayPage;
