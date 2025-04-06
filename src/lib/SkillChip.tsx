import { alpha, Badge, Chip, Tooltip, useTheme } from "@mui/material";
import { FC } from "react";

interface SkillChipProps {
  skill: Skill;
}

export const SkillChip: FC<SkillChipProps> = (props) => {
  const theme = useTheme();
  const { skill } = props;
  return (
    <Tooltip
      placement="top-start"
      arrow
      followCursor
      slotProps={{
        tooltip: {
          sx: { backgroundColor: theme.palette.violet?.main },
        },
        arrow: {
          sx: {
            "&::before": {
              backgroundColor: theme.palette.violet?.main,
            },
          },
        },
      }}
      key={skill.name}
      title={skill.experienceLabel}
    >
      <Badge
        badgeContent={skill.experienceLabel.replace(/[+]? years.*/g, "y")}
        color="primary"
        sx={{ margin: "10px" }}
      >
        <Chip
          label={skill.name}
          variant="outlined"
          color="secondary"
          sx={{
            backgroundColor: alpha(theme.palette.secondary.dark, 0.2),
            minWidth: "120px",
          }}
        />
      </Badge>
    </Tooltip>
  );
};
