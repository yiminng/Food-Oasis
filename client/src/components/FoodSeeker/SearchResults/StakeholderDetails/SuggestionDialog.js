import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as suggestionService from "services/suggestion-service";
import { TextField, Button } from "../../../UI";
import { DEFAULT_STAKEHOLDER } from "../../../../constants/stakeholder";
import { useToasterContext } from "../../../../contexts/toasterContext";

// inpute style for material inpute
const useStyles = makeStyles(() => ({
  correctionInput: {
    '& div': {
      '& textarea': {
        paddingRight: "2rem"
      }
    }
  }
}))

function SuggestionDialog(props) {
  const { setToast } = useToasterContext();
  const { onClose, open, stakeholder: sh, ...other } = props;
  const [inputError, setInputError] = useState(false)
  const classes = useStyles();

  const [stakeholder, setStakeholder] = useState({
    ...DEFAULT_STAKEHOLDER,
    ...sh,
  });

  const handleCancel = () => {
    onClose(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'notes' && inputError) {
      setInputError(false);
    }
    setStakeholder({ ...stakeholder, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!stakeholder.notes) {
      setInputError(true);
      return;
    }
    return stakeholder.notes && suggestionService
      .post(stakeholder)
      .then(() => {
        setToast({
          message: "Thank you for your help!",
        });
        onClose(true);
      })
      .catch(() => {
        setToast({
          message:
            "Sorry, submitting your correction failed, please email us at the address on the About page.",
        });
      });
  };

  return (
    <Dialog
      disableEscapeKeyDown
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Send Correction</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Please help us improve our data by letting us know when our
              information is incorrect. All fields are optional, but filling in
              as many as you can helps our volunteers to validate efficiently.
              Thanks!
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ position: "relative" }}>
            <TextField
              error={inputError}
              type="text"
              className={classes.correctionInput}
              size="small"
              multiline
              minRows={2}
              maxRows={12}
              label="Corrections"
              name="notes"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.notes}
              onChange={handleChange}
            />
            <div style={astrikStyle}>*</div>
            <div style={errorDisc}>{inputError && "Please enter corrections"}</div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              minRows={2}
              maxRows={12}
              label="Your Name (optional)"
              name="tipsterName"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.tipsterName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              minRows={2}
              maxRows={12}
              label="Your Phone (optional)"
              name="tipsterPhone"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.tipsterPhone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              size="small"
              multiline
              minRows={2}
              maxRows={12}
              label="Your Email (optional)"
              name="tipsterEmail"
              margin="normal"
              fullWidth
              autoFocus
              value={stakeholder.tipsterEmail}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}

SuggestionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  stakeholder: PropTypes.object,
};

const astrikStyle = {
  position: "absolute",
  top: "40px",
  right: "2rem",
  transform: "translateY(-8px)",
  color: "red",
  fontSize: "2rem"
}

const errorDisc = {
  color: "red",
  fontSize: "1rem"
}
export default SuggestionDialog;
