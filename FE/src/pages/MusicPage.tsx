import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import BaseTable, {
  BaseTableState,
  DefaultTableState,
  HeaderTable,
} from "../components/BaseTable.tsx";
import {
  useAddMusicMutation,
  useDeleteMusicMutation,
  useGetMusicQuery,
} from "../services/music.ts";

const MusicPage = () => {
  const [tableState, setTableState] =
    useState<BaseTableState>(DefaultTableState);
  const navigate = useNavigate();
  const { data } = useGetMusicQuery();
  const [deleteMusic] = useDeleteMusicMutation();
  const [addMusic] = useAddMusicMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [musicName, setMusicName] = useState("");
  const handleDelete = async (id: number) => {
    await deleteMusic(id);
  };
  const handleAdd = async (name: string) => {
    await addMusic({ name, url: "asd" });
  };
  const header: HeaderTable[] = [
    {
      name: "Name",
      key: "name",
      row: (_, rowData) => <Text fontWeight="bold">{rowData.name}</Text>,
    },
    {
      name: "Action",
      key: "action",
      row: (_, rowData) => (
        <IconButton
          aria-label="Delete"
          icon={<FiTrash />}
          colorScheme="red"
          size="sm"
          onClick={() => handleDelete(rowData.id)}
        />
      ),
    },
  ];

  const AddModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Add New Music</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Music Name"
              onChange={(e) => setMusicName(e.target.value)}
            />
            <Input type="file" accept="audio/*" />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleAdd(musicName)}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <AddModal />

      <Box
        width={{ base: "90%", md: "70%", lg: "60%" }} // Responsive width
        bg="blackAlpha.800"
        p={6}
        borderRadius="md"
        textAlign="center"
        color="white"
      >
        <HStack justifyContent="space-between" mb={4}>
          <Button colorScheme="blue" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button colorScheme="green" onClick={onOpen}>
            Add
          </Button>
        </HStack>

        <Text as="b" fontSize="3xl" mb={4}>
          Music
        </Text>

        <BaseTable
          columns={header}
          data={(data as []) ?? []}
          onTableStateChange={setTableState}
          tableState={tableState}
          hideCheckboxes={true}
        />
      </Box>
    </>
  );
};
export default MusicPage;
