import React, { useMemo } from "react";
import moment from "moment";
import {
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ViewIcon,
  EditIcon,
  DeleteIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import Card from "../card/Card";
import Menu from "../menu/MainMenu";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function AppTable(props) {
  const {
    columnsData,
    tableData,
    tableTitle = "",
    isMenu = false,
    isAddButton = false,
    onView,
    onEdit,
    onDelete,
    onMore,
  } = props;

  // Add SN and Actions columns dynamically
  const columns = useMemo(() => {
    const actionColumn = {
      Header: "ACTIONS",
      accessor: "actions",
      label: "ACTIONS",
      Cell: ({ row }) => (
        <Flex>
          {onView && (
            <IconButton
              icon={<ViewIcon />}
              size="sm"
              onClick={() => onView(row.original, "VIEW")}
              aria-label="View"
            />
          )}
          {onEdit && (
            <IconButton
              icon={<EditIcon />}
              size="sm"
              onClick={() => onEdit(row.original, "EDIT")}
              aria-label="Edit"
            />
          )}
          {onDelete && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              onClick={() => onDelete(row.original, "DELETE")}
              aria-label="Delete"
            />
          )}
          {onMore && (
            <IconButton
              icon={<HamburgerIcon />}
              size="sm"
              onClick={() => onMore(row.original, "MORE")}
              aria-label="More"
            />
          )}
        </Flex>
      ),
    };

    return [
      {
        Header: "SN",
        accessor: (_, rowIndex) => rowIndex + 1,
        label: "SN",
      },
      ...columnsData,
      actionColumn,
    ];
  }, [columnsData, onView, onEdit, onDelete, onMore]);

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const headerBgColor = useColorModeValue("gray.50", "gray.700");
  const rowHoverColor = useColorModeValue("gray.100", "gray.600");
  const alternateRowColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {tableTitle}
        </Text>
        {isMenu && <Menu />}
        {isAddButton && (
          <Button h="44px" mb="10px" variant="solid" colorScheme="blue">
            ADD MORE
          </Button>
        )}
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead bg={headerBgColor}>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.label}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={rowIndex}
                _hover={{ bg: rowHoverColor }}
                bg={rowIndex % 2 === 0 ? alternateRowColor : "transparent"}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.label === "NAME") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (cell.column.label === "DATE") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {moment(cell.value).format("YYYY-MM-DD")}
                      </Text>
                    );
                  } else if (cell.column.label === "SN") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {rowIndex + 1}
                      </Text>
                    );
                  } else if (cell.column.label === "ACTIONS") {
                    data = cell.render("Cell");
                  } else {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
