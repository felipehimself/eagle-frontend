import { Box, Tab, Tabs, TabsOwnProps } from "@mui/material";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface ICustomTabsProps {
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabLabels: string[];
  fullWidth?: TabsOwnProps["variant"];
}

export const CustomTabs = (props: ICustomTabsProps) => {
  const { fullWidth = "fullWidth" } = props;
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        variant={fullWidth}
        value={props.value}
        onChange={props.handleChange}
        aria-label="tabs"
      >
        {props.tabLabels.map((label, index) => (
          <Tab
            key={`${index}-${label}`}
            sx={{ fontSize: (theme) => theme.typography.pxToRem(13) }}
            label={label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </Box>
  );
};
