import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  labelButton: {
    cursor: 'pointer',
    margin: '0 5px',
    display: 'inline-block',
  },
  buttonText: {
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: palette.primary.main,
  },
}));

const LabelButton = ({ onClick, label, disabled = false, children }) => {
  const classes = useStyles();
  return (
    <div onClick={onClick} className={classes.labelButton}>
      <Button
        variant="outlined"
        size="small"
        disabled={disabled}
      >
        {children}
      </Button>
      <p className={classes.buttonText}>{label}</p>
    </div>
  );
};

export default LabelButton;
