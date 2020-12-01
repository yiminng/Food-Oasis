import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import PantryIcon from 'icons/pantry';
import MealIcon from 'icons/meal';
import PantryAndMealIcon from 'icons/pantryAndMeal';

const useStyles = makeStyles(({ palette }) => ({
  icon: {
    minHeight: props => props.size,
    minWidth: props => props.size,
    maxHeight: props => props.size,
    maxWidth: props => props.size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    paddingLeft: '3px',
    backgroundColor: props => props.hasPantry ? palette.primary.main : palette.secondary.main,
  },
}));

const CategoryTile = ({ categories, size = '32px' }) => {
  const hasPantry = !!categories.find(c => c.name === 'Food Pantry');
  let icon;
  if (categories.length > 1) icon = <PantryAndMealIcon />
  else if (hasPantry) icon = <PantryIcon />
  else icon = <MealIcon />

  const classes = useStyles({ hasPantry, size });
  return (
    <div className={classes.icon}>
      {icon}
    </div>
  );
};

export default CategoryTile;
