import { GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/reactDnd.ts";

type Props = {
  children: ReactNode;
  size: number;
  onDrop: () => void;
};
export const BoardCell = (props: Props) => {
  const [_, dropRef] = useDrop(
    () => ({
      accept: ItemType.PIECE,
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
    >
      {props.children}
    </GridItem>
  );
};
