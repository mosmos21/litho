import { ReactNode } from "react";
import { GridItem } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/reactDnd.ts";

type Props = {
  children: ReactNode;
  size: number;
  onSelect?: () => void;
  placeable?: boolean;
};
export const TileGridCell = (props: Props) => {
  const [_, dropRef] = useDrop(
    () => ({
      accept: ItemType.TILE,
      drop: props.onSelect,
    }),
    [props.onSelect]
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
      _hover={{
        bg: "gray.200",
      }}
      onClick={props.onSelect}
      onTouchEnd={props.onSelect}
      position="relative"
      _before={
        props.placeable
          ? {
              content: '""',
              position: "absolute",
              width: "calc(98% - 4px)",
              height: "calc(98% - 4px)",
              top: "1%",
              left: "1%",
              border: "2px dashed",
              borderColor: "gray.400",
            }
          : {}
      }
    >
      {props.children}
    </GridItem>
  );
};
