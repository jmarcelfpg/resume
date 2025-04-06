import {
  alpha,
  Box,
  darken,
  Icon,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { BounceAppBar } from "../MotionComponents";
import { PalpitatingMenuButton } from "../MotionComponents/PalpitatingMenuButton";
import { filteringOptions, skills } from "../docs/resumeData";
import { useState } from "react";
import { ExperienceChart, LatestProject, SkillChip } from "../lib";
import { randomColor } from "../Theme";

const initialSkills: Skill[] = [
  ...skills.map((skill) => ({ ...skill, barColor: randomColor() })),
];
initialSkills.sort((skillA, skillB) => {
  if (skillA.name > skillB.name) {
    return -1;
  }
  if (skillA.name > skillB.name) {
    return 1;
  }
  return 0;
});

export const MainPage = () => {
  const theme = useTheme();
  const [filterOption, setFilterOption] = useState("Relevant");
  const [sortedSkills, setSortedSkills] = useState(() => {
    return initialSkills.filter(({ subCatergory }) =>
      subCatergory.toUpperCase().includes("WEB")
    );
  });

  const onFilterSkills = (filter: string) => {
    let newFilteredSkills: Skill[] = [];
    if (filter === filterOption) {
      return;
    }
    if (filter.includes("Relevant")) {
      newFilteredSkills = initialSkills.filter(({ subCatergory }) =>
        subCatergory.toUpperCase().includes("WEB")
      );
    } else if (filter.includes("All")) {
      newFilteredSkills = initialSkills;
    }
    setFilterOption(filter);
    setSortedSkills(newFilteredSkills);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        padding: "0px 15px",
      }}
    >
      <BounceAppBar>
        <Toolbar>
          <PalpitatingMenuButton />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Resume
          </Typography>
        </Toolbar>
      </BounceAppBar>
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          marginTop: theme.spacing(4),
          [theme.breakpoints.down(850)]: {
            flexDirection: "column",
          },
        }}
      >
        <LatestProject />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            margin: "10px",
            gap: theme.spacing(2),
            [theme.breakpoints.up(850)]: {
              marginTop: 0,
            },
          }}
        >
          <Box
            sx={{
              border: `1px solid ${theme.palette.text.secondary}`,
              borderRadius: "100px",
              backgroundColor: alpha(
                darken(theme.palette.background.paper, 0.5),
                0.4
              ),
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography component={"div"} align="center">
              Rejoy with {filterOption.includes("All") ? "" : "my"}{" "}
              <Select
                variant="standard"
                IconComponent={Icon}
                sx={{
                  textTransform: "lowercase",
                  "& .MuiSelect-standard.MuiInputBase-input.MuiInput-input.MuiSelect-select":
                    {
                      paddingRight: "unset",
                    },
                  "& .MuiSelect-icon": {
                    display: "none",
                  },
                  // "&::before": {
                  //     borderBottom: "unset",
                  // }
                }}
                onChange={(event) => {
                  onFilterSkills(event.target.value);
                }}
                size="small"
                value={filterOption}
              >
                {filteringOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>{" "}
              {filterOption.includes("All") ? "my " : ""}
              skills
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {sortedSkills.map((skill, index) => (
              <SkillChip key={`${skill.name}-${index}`} skill={skill} />
            ))}
          </Box>
          <ExperienceChart skills={sortedSkills} />
        </Box>
      </Box>
    </Box>
  );
};
