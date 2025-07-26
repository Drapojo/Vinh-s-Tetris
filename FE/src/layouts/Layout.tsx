import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as signalR from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { FaCheck, FaComments, FaEdit, FaPaperPlane } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import { useUpdateUserMutation } from "../services/user.ts";
import { Message } from "../type/GlobalChat.ts";
import Disco from "../components/Disco.tsx";

export default function Layout() {
  const toast = useToast();
  const [editedName, setEditedName] = useState("");
  const [isEditingName, toggleEditName] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const handleUpdateUser = () => {
    updateUser({
      Name: editedName,
    });
  };
  const { isLoggedIn, currentUser, currentUserData } = useAuth();

  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );
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
    if (!isLoggedIn()) {
      toast({
        status: "error",
        title: "Something went wrong",
        description: "Please login to use this feature!",
        isClosable: true,
        duration: 3000,
      });
      return;
    }
    if (newMessage.trim() && connection && currentUser) {
      await connection.invoke("SendMessage", currentUser.id, newMessage);
      setNewMessage("");
    }
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
          <PopoverContent
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="lg"
            w="300px"
          >
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
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IconButton
                  icon={<FaPaperPlane />}
                  aria-label="Send"
                  onClick={sendMessage}
                />
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Disco />
      </HStack>
      <Outlet />
    </Box>
  );
}
