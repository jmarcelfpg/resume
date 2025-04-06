import resumeJson from "./Marcel Peimbertd Resume Real.json";

export const filteringOptions = ["All", "Relevant"];
export const latestProject =
  resumeJson.projects[resumeJson.projects.length - 1];
export const skills = resumeJson.skills;
export { resumeJson };
