import { Circle, School } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  Box,
  darken,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Props } from "recharts/types/component/DefaultLegendContent";
import * as logos from "../logos";
import { skills } from "../docs/resumeData";

export const LegendList: (props: Props) => React.ReactNode = (props) => {
  const theme = useTheme();
  const { onClick, payload } = props;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List sx={{ padding: 0 }}>
        <ListItem
          sx={{
            backgroundColor: darken(theme.palette.background.paper, 0.5),
          }}
        >
          <ListItemText>Skill by year</ListItemText>
        </ListItem>
      </List>
      <List
        sx={{
          overflow: "auto",
          paddingTop: 0,
          backgroundColor: alpha(
            darken(theme.palette.background.paper, 0.5),
            0.4
          ),
        }}
      >
        {payload &&
          payload.map((entry, index) => {
            let icon;
            const logo = (logos as { [key: string]: string })[
              `${(entry.value as string)
                .replace(/\s.*/g, "")
                .toLowerCase()}_logo`
            ];
            if (!logo) {
              const skillFound = skills.find(
                (skill) => skill.name === entry.value
              );
              if (skillFound && skillFound.subCatergory === "Knowledge") {
                icon = <School />;
              }
            }

            return (
              <>
                {!!index && <Divider variant="middle" component="li" />}
                <ListItem
                  dense
                  key={`item-${index}`}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(
                        darken(theme.palette.background.paper, 0.5),
                        0.6
                      ),
                    },
                  }}
                  onClick={(event) => {
                    onClick && onClick(entry, index, event);
                  }}
                >
                  <ListItemIcon sx={{ color: entry.color }}>
                    <Circle />
                  </ListItemIcon>
                  <ListItemText primary={entry.value}>
                    {entry.value}
                  </ListItemText>
                  {logo && (
                    <ListItemAvatar sx={{ minWidth: 56 / 2 }}>
                      <Avatar
                        variant="square"
                        alt={entry.value}
                        src={logo}
                        sx={{ width: 24, height: 24 }}
                      />
                    </ListItemAvatar>
                  )}
                  {icon && (
                    <ListItemIcon sx={{ minWidth: 56 / 2 }}>
                      {icon}
                    </ListItemIcon>
                  )}
                </ListItem>
              </>
            );
          })}
      </List>
    </Box>
  );
};

interface ExperienceChartProps {
  skills: Skill[];
}

export const ExperienceChart: FC<ExperienceChartProps> = (props) => {
  const theme = useTheme();
  const [hoverBar, setHoverBar] = useState("");
  const [activeBar, setActiveBar] = useState("");
  const [, setSeed] = useState(1);
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const charContainerRef = useRef(document.createElement("div"));
  const barSkills = useMemo(() => {
    return props.skills.reduce(
      (bar, skill) => {
        bar[skill.name] = skill.experience;
        return bar;
      },
      { name: "Experience" } as { [key: string]: number | string }
    );
  }, [props.skills]);
  const width =
    charContainerRef.current.clientWidth ||
    charContainerRef.current.clientHeight ||
    200;

  const updateAtResize = () => {
    setSeed(Math.random());
  };

  useEffect(() => {
    window.addEventListener("resize", updateAtResize);
    return () => window.removeEventListener("resize", updateAtResize);
  }, []);

  return (
    <Box
      ref={charContainerRef}
      sx={{
        maxWidth: "80vw",
        maxHeight: "80vw",
        flex: 3,
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      <ResponsiveContainer width={width} height="90%">
        <BarChart data={[barSkills]}>
          <CartesianGrid
            vertical={false}
            fill={darken(theme.palette.background.paper, 0.5)}
            fillOpacity={0.3}
          />
          <XAxis name="Experience" dataKey="name" type="category" />
          <YAxis axisLine={false} />
          {/* <Tooltip  /> */}
          {!isDownMd && (
            <Legend
              iconType="circle"
              layout={"vertical"}
              align={"right"}
              verticalAlign={"middle"}
              wrapperStyle={{
                height: "100%",
                paddingLeft: theme.spacing(3),
                paddingBottom: theme.spacing(4),
              }}
              onClick={(entry, index, event) =>
                console.log({ entry, index, event })
              }
              content={LegendList}
            />
          )}
          {props.skills.map((skill) => {
            const isHovering = hoverBar === skill.name;
            const isActive = activeBar === skill.name;
            const fill = isActive
              ? theme.palette.action.active
              : isHovering
              ? darken(skill.barColor || "", 0.3)
              : skill.barColor;
            return (
              <Bar
                dataKey={skill.name}
                fill={fill}
                onClick={() => {
                  if (skill.name !== activeBar) {
                    setActiveBar(skill.name);
                  } else {
                    setActiveBar("");
                  }
                }}
                onMouseOver={() => {
                  setHoverBar(skill.name);
                }}
                onMouseLeave={() => {
                  setHoverBar("");
                }}
              >
                <LabelList
                  dataKey="name"
                  position="insideBottom"
                  content={(props) => {
                    const { x = 0, y = 0, width = 0, height = 0 } = props;
                    let finalX = +x + 2;
                    let finalY = +y + +height - (+height + +width);
                    let finalWidth = +width - 4;
                    let schollFinalY = finalY - +height / 2 + +width / 2;
                    if (finalY < 0) {
                      finalY = 0;
                    }
                    if (finalX < 0) {
                      finalX = 0;
                    }
                    if (finalWidth < 0) {
                      finalWidth = 0;
                    }
                    if (schollFinalY < 0) {
                      schollFinalY = 0;
                    }

                    const logo = (logos as { [key: string]: string })[
                      `${(skill.name as string)
                        .replace(/\s.*/g, "")
                        .toLowerCase()}_logo`
                    ];

                    if (!logo && skill.subCatergory === "Knowledge") {
                      return (
                        <School
                          x={finalX}
                          y={finalY - +height / 2 + +width / 2}
                          width={finalWidth}
                          height={height}
                        />
                      );
                    }

                    return (
                      <image
                        x={finalX}
                        y={finalY}
                        width={finalWidth}
                        href={logo}
                      />
                    );
                  }}
                />
              </Bar>
            );
          })}

          <ReferenceLine
            y={5}
            stroke={theme.palette.success.main}
            strokeWidth={5}
            strokeDasharray="50"
          >
            <Label
              fill={theme.palette.text.primary}
              value="Nice level of Experience"
              position="insideTopLeft"
            />
          </ReferenceLine>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
