import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import BaseTable, {
  BaseTableState,
  DefaultTableState,
  HeaderTable,
} from "../components/BaseTable.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce.ts";
import { useGetUsersQuery } from "../services/user.ts";

const UserPage = () => {
  const [tableState, setTableState] = useState<BaseTableState>(DefaultTableState);
  const [searchValue, setSearchValue] = useState("");
  const deboundSearch = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const { data } = useGetUsersQuery({
    PageIndex: tableState.page_index ?? 0,
    PageSize: tableState.page_size ?? 10,
    Search: deboundSearch,
    SortBy: tableState.sort_by,
    SortOrder: tableState.sort_order,
  });
  const header: HeaderTable[] = [
    {
      name: "Player",
      key: "email",
      row: (_, rowData) => (
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{rowData.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {rowData.email}
          </Text>
        </VStack>
      ),
      sortable: true
    },
    {
      name: "Game Played",
      key: "gamePlayed",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.data.gamePlayed}</Text>,
    },
    {
      name: "HighScore",
      key: "highScore",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.data.highScore}</Text>,
    }
  ];
  return (
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
        <Input
          placeholder="Search name"
          bg="whiteAlpha.300"
          color="white"
          _placeholder={{ color: "gray.300" }}
          width={{ base: "60%", md: "40%" }}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </HStack>

      <Text as="b" fontSize="3xl" mb={4}>
        Users
      </Text>

      <BaseTable
        columns={header}
        data={data?.data ?? []}
        onTableStateChange={setTableState}
        tableState={tableState}
        hideCheckboxes={true}
      />
    </Box>
  );
};
export default UserPage;
