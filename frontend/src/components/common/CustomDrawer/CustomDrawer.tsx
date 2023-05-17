import React from "react";
import Drawer from "@mui/material/Drawer";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Drawer open={isOpen} onClose={onClose} anchor="right">
      {children}
    </Drawer>
  );
};

export default CustomDrawer;
