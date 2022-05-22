import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  renderContent: () => React.ReactNode;
  index: number;
  value: number;
}

const TabPanelBox = styled(Box)`
  height: calc(100% - 3rem);
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, renderContent, ...other } = props;

  return (
    <TabPanelBox
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Fragment>{renderContent()}</Fragment>}
    </TabPanelBox>
  );
}

export default TabPanel;
