import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text, useToast,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {
  FaCheck, FaComments,
  FaEdit,
  FaMusic,
  FaPaperPlane,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth.ts";
import { useUpdateUserMutation } from "../services/user.ts";
import * as signalR from "@microsoft/signalr";
import {Message} from "../type/GlobalChat.ts";
import {useGetMusicQuery} from "../services/music.ts";

export default function Layout() {
  const toast = useToast();
  const {data: songs} = useGetMusicQuery();
  const [editedName, setEditedName] = useState("");
  const [isEditingName, toggleEditName] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const handleUpdateUser = () => {
    updateUser({
      Name: editedName,
    });
  };
  const { isLoggedIn, currentUser, currentUserData } = useAuth();

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_API_BACKEND_URL}/chatHub`)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err) => console.error("Connection error:", err));

    hubConnection.on("ReceiveMessage", (user, message) => {
      setMessages((prev) => [...prev, { user, message: message }]);
    });

    setConnection(hubConnection);

    return () => {
      hubConnection.stop();
    };
  }, []);
  const sendMessage = async () => {
    if(!isLoggedIn()) {
      toast({
        status: "error",
        title: "Something went wrong",
        description: "Please login to use this feature!",
        isClosable: true,
        duration: 3000
      });
      return;
    }
    if (newMessage.trim() && connection && currentUser) {
      await connection.invoke("SendMessage", currentUser.id, newMessage);
      setNewMessage("");
    }
  }

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].url;
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].url;
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage="url('/background.jpg')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <HStack
        position="fixed"
        top="10px"
        right="10px"
        zIndex="1000"
        spacing={3}
      >
        {isLoggedIn() && (
          <Popover>
            <PopoverTrigger>
              <Avatar
                name={currentUser?.name}
                cursor="pointer"
                boxShadow="lg"
              />
            </PopoverTrigger>
            <PopoverContent
              bg="white"
              p={4}
              borderRadius="lg"
              boxShadow="lg"
              w="400px"
            >
              <PopoverArrow />
              <PopoverBody textAlign="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {isEditingName ? (
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      size="sm"
                      w="60%"
                      onBlur={handleUpdateUser}
                    />
                  ) : (
                    <Text>{currentUser?.name}</Text>
                  )}
                  <IconButton
                    aria-label="Edit Name"
                    icon={isEditingName ? <FaCheck /> : <FaEdit />}
                    size="sm"
                    onClick={() => toggleEditName(!isEditingName)}
                    ml={2}
                  />
                </Box>

                <Box mt={2}>
                  <Text>{currentUser?.email}</Text>
                </Box>

                <Box mt={3}>
                  <Text fontWeight="bold">
                    Games Played: {currentUserData?.gamePlayed}
                  </Text>
                  <Text fontWeight="bold">
                    High Score: {currentUserData?.highScore}
                  </Text>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}

        <Popover>
          <PopoverTrigger>
            <Button
              colorScheme="blue"
              borderRadius="50%"
              boxShadow="lg"
              w="50px"
              h="50px"
              fontSize="40px"
              transition="transform 0.3s ease-in-out"
              _hover={{ transform: "scale(1.1)" }}
              animation={isPlaying ? "spin 2s linear infinite" : "none"}
              sx={{
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            >
              <FaMusic />
            </Button>
          </PopoverTrigger>
          <PopoverContent bg="white" p={4} borderRadius="lg" boxShadow="lg">
            <PopoverArrow />
            <PopoverBody textAlign="center">
              <Text fontWeight="bold">{songs ? songs[currentSongIndex]?.name : ""}</Text>
              <Box mt={2} display="flex" justifyContent="center" gap={3}>
                <IconButton
                  aria-label="Previous Song"
                  icon={<FaStepBackward />}
                  onClick={prevSong}
                />
                {isPlaying ? (
                  <IconButton
                    aria-label="Pause"
                    icon={<FaPause />}
                    onClick={togglePlay}
                  />
                ) : (
                  <IconButton
                    aria-label="Play"
                    icon={<FaPlay />}
                    onClick={togglePlay}
                  />
                )}
                <IconButton
                  aria-label="Next Song"
                  icon={<FaStepForward />}
                  onClick={nextSong}
                />
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <Popover placement="top-start">
        <PopoverTrigger>
          <IconButton
            icon={<FaComments />}
            aria-label="Open Chat"
            position="fixed"
            bottom="20px"
            left="20px"
            zIndex="1000"
            borderRadius="full"
            boxShadow="lg"
          />
        </PopoverTrigger>
        <PopoverContent bg="white" p={4} borderRadius="lg" boxShadow="lg" w="300px">
          <PopoverArrow />
          <PopoverBody>
            <Box maxH="200px" overflowY="auto">
              {messages.map((msg: Message, index) => (
                <Box key={index} p={2} borderBottom="1px solid #ddd">
                  <Text fontWeight="bold" fontSize="sm">
                    {msg.user}:
                  </Text>
                  <Text fontSize="sm" maxW="250px" wordBreak="break-word">
                    {msg.message}
                  </Text>
                </Box>
              ))}
            </Box>
            <HStack mt={3}>
              <Input placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
              <IconButton icon={<FaPaperPlane />} aria-label="Send" onClick={sendMessage} />
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <audio ref={audioRef} src="/ThemeSong.mp4" autoPlay={true} onEnded={nextSong}/>
      <Outlet />
    </Box>
  );
}
