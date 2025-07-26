import { TriangleDownIcon, TriangleUpIcon, UpDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Select,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import EmptyState from "./EmptyState.tsx";

export type HeaderTable = {
  row?: (value: unknown, rowData: unknown) => React.ReactNode;
  sortable?: boolean;
  name: string;
  key: string;
};

export type BaseTableState = {
  selected_items?: unknown[];
  sort_by?: string;
  sort_order?: "asc" | "desc" | "";
  page_index?: number;
  page_size?: number;
};

export const DefaultTableState: BaseTableState = {
  selected_items: [],
  sort_by: "",
  sort_order: "",
  page_index: 0,
  page_size: 10,
};

type CustomStyles = {
  [key: string]: React.CSSProperties;
};

interface BaseTableProps<T extends object> {
  columns: HeaderTable[];

  data: T[];

  tableState?: Partial<BaseTableState>;

  onTableStateChange: (state: BaseTableState) => void;

  hideCheckboxes?: boolean;

  count?: number;

  customStyles?: CustomStyles;

  isPending?: boolean;
}

type DataRow = { [key: string]: unknown; id: string };

const BaseTable = <T extends DataRow>({
  columns,
  data,
  tableState = DefaultTableState,
  onTableStateChange,
  hideCheckboxes = false,
  count = 0,
  customStyles = {},
  isPending = false,
}: BaseTableProps<T>) => {
  const { selected_items, sort_by, sort_order, page_index, page_size } =
    tableState;

  const updateTableState = (newState: BaseTableState) => {
    onTableStateChange?.(newState);
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedSelectedItems = e.target.checked ? data : [];
    updateTableState({
      ...tableState,
      selected_items: updatedSelectedItems,
    });
  };

  const toggleSelectItem = (row: T) => {
    const updatedSelectedItems = selected_items?.some(
      (item) => item.id === row.id,
    )
      ? selected_items.filter((item) => item.id !== row.id)
      : [...(selected_items ?? []), row];
    updateTableState({
      ...tableState,
      selected_items: updatedSelectedItems,
    });
  };

  const handleSort = (columnKey: string) => {
    const updatedSortOrder =
      sort_by === columnKey
        ? sort_order === "asc"
          ? "desc"
          : sort_order === "desc"
            ? ""
            : "asc"
        : "asc";
    const updatedSortBy = updatedSortOrder === "" ? "" : columnKey;

    updateTableState({
      ...tableState,
      sort_by: updatedSortBy,
      sort_order: updatedSortOrder,
    });
  };
  const calculateTotalPages = (count: number, pageSize: number) => {
    return Math.ceil(count / pageSize);
  };

  const handlePageChange = (newPageIndex: number) => {
    updateTableState({
      ...tableState,
      page_index: newPageIndex,
    });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number.parseInt(e.target.value, 10);
    updateTableState({
      ...tableState,
      page_size: newPageSize,
      page_index: 0,
    });
  };

  if (data.length <= 0) return <EmptyState />;

  const totalPages = calculateTotalPages(count, page_size || 1);

  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table size={{ base: "sm", lg: "md" }} variant="simple">
          <Thead>
            <Tr>
              {!hideCheckboxes && (
                <Th>
                  <Checkbox
                    isChecked={selected_items?.length === data.length}
                    onChange={toggleSelectAll}
                  />
                </Th>
              )}
              {columns.map((column, index) => (
                <Th
                  key={index}
                  onClick={
                    column.sortable ? () => handleSort(column.key) : undefined
                  }
                  cursor={column.sortable ? "pointer" : "default"}
                  userSelect="none"
                >
                  {column.name}{" "}
                  {column.sortable &&
                    (sort_by === column.key ? (
                      sort_order === "asc" ? (
                        <TriangleUpIcon />
                      ) : sort_order === "desc" ? (
                        <TriangleDownIcon />
                      ) : (
                        <UpDownIcon />
                      )
                    ) : (
                      <UpDownIcon />
                    ))}
                </Th>
              ))}
            </Tr>
          </Thead>
          {isPending ? (
            <Tbody>
              <Tr>
                {new Array(columns.length).fill(null).map((_, index) => (
                  <Td key={index}>
                    <SkeletonText noOfLines={1} paddingBlock="16px" />
                  </Td>
                ))}
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {data.map((row) => (
                <Tr key={row.id}>
                  {!hideCheckboxes && (
                    <Td>
                      <Checkbox
                        isChecked={selected_items?.some(
                          (item: unknown) => item.id === row.id,
                        )}
                        onChange={() => toggleSelectItem(row)}
                      />
                    </Td>
                  )}
                  {columns.map((column) => (
                    <Td key={column.key} style={customStyles[column.key] || {}}>
                      {column.row
                        ? column.row(row[column.key], row)
                        : row[column.key]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>

      {count > 0 && (
        <HStack justifyContent="space-between" mt={4} alignItems="center">
          <HStack>
            <Text>Page size</Text>
            <Select
              value={page_size}
              onChange={handlePageSizeChange}
              width="auto"
              size="sm"
            >
              {[10, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </HStack>

          <HStack spacing={4}>
            <Button
              onClick={() => handlePageChange(page_index! - 1)}
              isDisabled={page_index === 0}
            >
              Prev
            </Button>
            <Text>
              Page {page_index! + 1}/{totalPages}
            </Text>
            <Button
              onClick={() => handlePageChange(page_index! + 1)}
              isDisabled={page_index! + 1 >= totalPages}
            >
              Next
            </Button>
          </HStack>
        </HStack>
      )}
    </Box>
  );
};

export default BaseTable;
