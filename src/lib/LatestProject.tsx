import { useTheme } from "@mui/material";
import { OilBarrelTwoTone, TaskAlt } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { latestProject } from "../docs/resumeData";

export const LatestProject = () => {
  const theme = useTheme();
  return (
    <Card
      elevation={4}
      sx={{
        flex: 1,
        [theme.breakpoints.down("sm")]: {
          maxWidth: "unset",
        },
        [theme.breakpoints.down("md")]: {
          minWidth: 400,
          maxWidth: 500,
        },
        [theme.breakpoints.up("md")]: {
          minWidth: 200,
          maxWidth: 400,
        },
      }}
    >
      <CardHeader
        avatar={<OilBarrelTwoTone />}
        slotProps={{
          title: {
            component: "div",
          },
          subheader: {
            component: "div",
          },
        }}
        title={
          <Box>
            {latestProject.pojectName} <Box>@{latestProject.company}</Box>
          </Box>
        }
        subheader={
          <Box>
            Latest Project{" "}
            <Box>
              (From {latestProject.startDate} to {latestProject.endDate})
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Typography component="div">
          <Box>
            as <b>{latestProject.position}</b>
          </Box>
        </Typography>
        <Divider />
        <br />
        <Typography gutterBottom textAlign="justify">
          <b>Something about it:</b>
        </Typography>
        <Typography textAlign="justify">{latestProject.description}</Typography>
        <Divider />
        <br />
        <List subheader={<b>Tasks</b>}>
          {latestProject.responsabilities.map((task, index) => (
            <ListItem key={index} sx={{ padding: "5px 0px" }}>
              <ListItemText
                slotProps={{
                  primary: {
                    component: "div",
                  },
                }}
                sx={{ textAlign: "justify" }}
                primary={
                  <Box>
                    <TaskAlt sx={{ font: "inherit" }} /> {task}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
