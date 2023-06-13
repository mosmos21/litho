import { ReactNode } from "react";
import { GridItem } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/reactDnd.ts";

type Props = {
  children: ReactNode;
  size: number;
  onDrop: () => void;
};
export const TileGridCell = (props: Props) => {
  const [_, dropRef] = useDrop(
    () => ({
      accept: ItemType.TILE,
      drop: props.onDrop,
    }),
    [props.onDrop]
  );

  return (
    <GridItem
      ref={dropRef}
      width={`${props.size}px`}
      height={`${props.size}px`}
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      _hover={{
        bg: "gray.200",
      }}
    >
      {props.children}
    </GridItem>
  );
};
