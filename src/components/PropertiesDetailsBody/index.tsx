import React, { FC, ReactNode, useState, SyntheticEvent } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../TabPanel";
import TabPanelContent from "../TabPanelContent";
import useProperties from "../../redux/features/properties/properties.hooks";
import { useDispatch } from "react-redux";
import { setActiveTabIndex } from "../../redux/features/properties/properties.slice";

const PropertiesDetailsBodyBox = styled(Box)`
  height: calc(100% - 3.5rem);
`;

interface PropertiesDetailsBodyProps {
  children?: ReactNode;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PropertiesDetailsBody: FC<PropertiesDetailsBodyProps> = ({}) => {
  const dispatch = useDispatch();
  const { getPropertyTypes, activeTabIndex } = useProperties();
  const propertyTypes = getPropertyTypes();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    dispatch(setActiveTabIndex(newValue));
  };

  return (
    <PropertiesDetailsBodyBox>
      <Box sx={{ borderBottom: 1, borderColor: "divider", height: "3rem" }}>
        <Tabs
          value={activeTabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="all properties details"
        >
          {propertyTypes.map(({ name, count }, index) => (
            <Tab
              key={index}
              sx={{ textTransform: "unset" }}
              label={`${name} (${count})`}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      {propertyTypes.map((category, index) => (
        <TabPanel
          value={activeTabIndex}
          index={index}
          key={index}
          renderContent={() => <TabPanelContent propertyType={category.name} />}
        />
      ))}
    </PropertiesDetailsBodyBox>
  );
};

export default PropertiesDetailsBody;
