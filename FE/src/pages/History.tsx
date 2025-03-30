import { useState } from "react";
import BaseTable, {
  BaseTableState,
  DefaultTableState,
  HeaderTable,
} from "../components/BaseTable.tsx";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useGetHistoriesQuery } from "../services/history.ts";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [tableState, setTableState] =
    useState<BaseTableState>(DefaultTableState);
  const navigate = useNavigate();
  const { data } = useGetHistoriesQuery({
    Search: "",
    SortBy: tableState.sort_by,
    SortOrder: tableState.sort_order,
    PageSize: tableState.page_size ?? 10,
    PageIndex: tableState.page_index ?? 0,
  });
  const header: HeaderTable[] = [
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
      sortable: true,
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
      width={{ base: "90%", md: "70%", lg: "60%" }}
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
      </HStack>

      <Text as="b" fontSize="3xl" mb={4}>
        History
      </Text>

      <BaseTable
        columns={header}
        data={data?.data ?? []}
        onTableStateChange={setTableState}
        tableState={tableState}
        hideCheckboxes={true}
        count={data?.count ?? 0}
      />
    </Box>
  );
};
export default History;
