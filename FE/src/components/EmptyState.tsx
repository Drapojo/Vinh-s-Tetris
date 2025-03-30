import { Heading, Text, VStack } from "@chakra-ui/react";
import { TbFilterExclamation } from "react-icons/tb";

interface EmptyStateProps {
  title?: string;

  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}) => {
  return (
    <VStack color={"ui.gray"} mt={30} textAlign="center" opacity={0.6} gap={10}>
      <TbFilterExclamation size={60} />
      <Heading size="md">{title ?? "No data found"}</Heading>
      <Text>{description ?? "Please check your filters and try again."}</Text>
    </VStack>
  );
};

export default EmptyState;
