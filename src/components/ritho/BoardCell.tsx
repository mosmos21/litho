import { GridItem } from "@chakra-ui/react";
import { MouseEvent, ReactNode, TouchEvent } from "react";
import { useDrop } from "react-dnd";
import { ItemType } from "@/utils/reactDnd.ts";

type Props = {
  children: ReactNode;
  size: number;
  onDrop: () => void;
  onClick: (event: MouseEvent) => void;
  onTouch: (event: TouchEvent) => void;
  moveable?: boolean;
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
      onClick={props.onClick}
      onTouchEnd={props.onTouch}
      position="relative"
      _before={
        props.moveable
          ? {
              content: '""',
              position: "absolute",
              width: "calc(95% - 4px)",
              height: "calc(95% - 4px)",
              top: "2.5%",
              left: "2.5%",
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
