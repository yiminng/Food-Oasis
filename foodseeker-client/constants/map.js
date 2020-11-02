import {
  FOOD_PANTRY_CATEGORY_ID,
  MEAL_PROGRAM_CATEGORY_ID,
} from "./stakeholder";
import theme from "theme";

export const ORGANIZATION_LABELS = {
  [FOOD_PANTRY_CATEGORY_ID]: "Food Pantry",
  [MEAL_PROGRAM_CATEGORY_ID]: "Meal",
};

export const ORGANIZATION_COLORS = {
  [FOOD_PANTRY_CATEGORY_ID]: theme.palette.primary.main,
  [MEAL_PROGRAM_CATEGORY_ID]: theme.palette.secondary.main,
};

export const CLOSED_COLOR = theme.palette.inactive.main;
