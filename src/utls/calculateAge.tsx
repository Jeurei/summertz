import { differenceInYears } from "date-fns";

export const calculateAge = (dob: Date): number => {
  const age = differenceInYears(new Date(), dob);
  return age;
};
