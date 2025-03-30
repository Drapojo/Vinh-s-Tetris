import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import BaseTable, {
  BaseTableState,
  DefaultTableState,
  HeaderTable,
} from "../components/BaseTable.tsx";
import { useState } from "react";
import { useGetLeaderboardQuery } from "../services/leaderboard.ts";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce.ts";

const Leaderboard = () => {
  const [tableState, setTableState] = useState<BaseTableState>({
    ...DefaultTableState,
    sort_by: "Points",
    sort_order: "desc",
  });
  const [searchValue, setSearchValue] = useState("");
  const deboundSearch = useDebounce(searchValue, 500);
  const navigate = useNavigate();
  const { data } = useGetLeaderboardQuery({
    PageIndex: tableState.page_index ?? 0,
    PageSize: tableState.page_size ?? 10,
    Search: deboundSearch,
    SortBy: tableState.sort_by,
    SortOrder: tableState.sort_order,
  });
  const header: HeaderTable[] = [
    {
      name: "Player",
      key: "Player",
      row: (_, rowData) => (
        <VStack align="start" spacing={0}>
          <Text fontWeight="bold">{rowData.user.name}</Text>
          <Text fontSize="sm" color="gray.500">
            {rowData.user.email}
          </Text>
        </VStack>
      ),
    },
    {
      name: "Points",
      key: "Points",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.points}</Text>,
    },
    {
      name: "Lines",
      key: "Lines",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.lines}</Text>,
    },
    {
      name: "Time",
      key: "Time",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.time}</Text>,
    },
    {
      name: "Level",
      key: "Level",
      sortable: true,
      row: (_, rowData) => <Text>{rowData.level}</Text>,
    },
    {
      name: "Date",
      key: "Date",
      row: (_, rowData) => (
        <Text>
          {new Date(rowData.date).toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      ),
    },
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
        Leaderboard
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
export default Leaderboard;
