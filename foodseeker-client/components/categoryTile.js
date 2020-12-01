import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import PantryIcon from 'icons/pantry';
import MealIcon from 'icons/meal';

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
    background: props => 
      props.type === 'both' && `linear-gradient(90deg, ${palette.primary.main} 50%, ${palette.secondary.main} 50%)` ||
      props.type === 'meal' && palette.primary.main ||
      props.type === 'pantry' && palette.secondary.main
  },
}));

const CategoryTile = ({ categories, size = '44px' }) => {
  let type;
  let icon;
  if (categories.length > 1) {
    type = 'both'
    icon = (
      <>
        <PantryIcon style={{ marginLeft: '-5px' }} />
        <MealIcon style={{ marginLeft: '5px' }} />
      </>
    )
  }
  else if (!!categories.find(c => c.name === 'Food Pantry')) {
    type = 'pantry'
    icon = <PantryIcon />
  }
  else {
    type = 'meal'
    icon = <MealIcon />
  }

  const classes = useStyles({ type, size });
  return (
    <div className={classes.icon}>
      {icon}
    </div>
  );
};

export default CategoryTile;
