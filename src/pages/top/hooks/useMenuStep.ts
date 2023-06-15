import { useState, useCallback } from "react";

type MenuName = "NewGameNameInput" | "JoinGameSelect" | "JoinGameNameInput";

export const animateStyle = {
  open: {
    height: "auto",
  },
  close: {
    height: 0,
  },
};

export const useMenuStep = () => {
  const [openMenuName, setOpenMenuName] = useState<MenuName | undefined>();

  const getMenuMotionProps = useCallback(
    (menuName?: MenuName) => ({
      initial: menuName ? animateStyle.close : animateStyle.open,
      animate:
        menuName === openMenuName ? animateStyle.open : animateStyle.close,
    }),
    [openMenuName]
  );

  const closeMenu = useCallback(() => setOpenMenuName(undefined), []);

  return {
    getMenuMotionProps,
    openMenu: setOpenMenuName,
    closeMenu,
  };
};
