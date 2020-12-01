import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import dayjs from 'dayjs';
import clsx from 'clsx';
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";
import WebsiteIcon from "@material-ui/icons/Public";
import DirectionsIcon from "@material-ui/icons/Directions";
import CallIcon from "@material-ui/icons/Call";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import BackIcon from "@material-ui/icons/ArrowBack";

import CategoryTile from 'components/categoryTile';
import LabelButton from 'components/labelButton';
import { VERIFICATION_STATUS } from "constants/stakeholder";
import { getGoogleMapsUrl, extractNumbers } from "util/index";

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  stakeholder: {
    overflowX: 'hidden',
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    paddingBottom: "5em",
    flexShrink: 0,
    overflowY: 'scroll',
    height: '100%',
    [breakpoints.down("xs")]: {
      fontSize: "12px",
    },
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  info: {
    fontSize: "1.1em",
    width: "60%",
    display: "inherit",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  hoursContainer: {
    width: "100%",
    display: "inherit",
    flexDirection: "inherit",
    fontSize: "1.2em",
  },
  singleHourContainer: {
    width: "100%",
    display: "inherit",
    justifyContent: "space-between",
    margin: ".8em 0",
  },
  fontSize: {
    fontSize: "14px",
    width: '100%',
  },
  label: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  closedLabel: {
    color: "#545454",
    alignSelf: "flex-end",
    backgroundColor: "#E0E0E0",
    padding: ".25em .5em",
    borderRadius: "3px",
  },
  buttonContainer: {
    width: 'calc(100% + 30px)',
    marginTop: "10px",
  },
  buttons: {
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginLeft: '-15px',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
  numbers: {
    display: "inline",
  },
  categoryName: {
    fontWeight: 'bold',
  },
  pantry: {
    color: palette.primary.main,
  },
  meal: {
    color: palette.secondary.main,
  },
  name: {
    display: 'flex',
    alignItems: 'center',
  },
  back: {
    position: "fixed",
    bottom: "1em",
    left: "1em",
  },
}));

const StakeholderDetails = ({
  onSelectStakeholder,
  stakeholder,
  setToast,
}) => {
  const classes = useStyles();
  // const [SuggestionDialogOpen, setSuggestionDialogOpen] = useState(false);

  // const handleSuggestionDialogOpen = async () => {
  //   setSuggestionDialogOpen(true);
  // };

  // const handleSuggestionDialogClose = async (loginId) => {
  //   setSuggestionDialogOpen(false);
  // };

  const dayOfWeek = (dayOfWeekString) => {
    switch (dayOfWeekString.toLowerCase()) {
      case "sun":
        return 1;
      case "mon":
        return 2;
      case "tue":
        return 3;
      case "wed":
        return 4;
      case "thu":
        return 5;
      case "fri":
        return 6;
      default:
        return 7;
    }
  };

  const hoursSort = (h1, h2) => {
    if (h1.week_of_month !== h2.week_of_month) {
      return h1.week_of_month < h2.week_of_month ? -1 : 1;
    }
    const h1dow = dayOfWeek(h1.day_of_week);
    const h2dow = dayOfWeek(h2.day_of_week);
    if (h1dow !== h2dow) {
      return h1dow < h2dow ? -1 : 1;
    }
    return h1.open < h2.open ? -1 : 1;
  };

  const standardTime = (timeStr) => {
    if (timeStr) {
      if (parseInt(timeStr.substring(0, 2)) === 12) {
        return `12${timeStr.substring(2, 5)} PM`;
      }
      return parseInt(timeStr.substring(0, 2)) > 12
        ? `${parseInt(timeStr.substring(0, 2)) - 12}${timeStr.substring(
            2,
            5
          )} PM`
        : `${timeStr.substring(0, 5)} AM`;
    }
  };

  const numbers = extractNumbers(stakeholder.phone).map((n) => {
    if (n.number) {
      return (
        <a
          key={n.value}
          className={classes.fontSize}
          href={"tel:" + n.value}
          target="_blank"
          rel="noopener noreferrer"
        >
          {n.value}
        </a>
      );
    } else {
      return <span key={n.value}> {n.value} </span>;
    }
  });

  const mainNumber = extractNumbers(stakeholder.phone).find((n) => n.number);
  const modifiedDate = stakeholder.approvedDate || stakeholder.modifiedDate || stakeholder.createdDate;
  const categories = stakeholder.categories.filter(c => c.name === 'Food Pantry' || c.name === 'Meal Program')

  return (
    <div className={classes.stakeholder}>
      {/* <SuggestionDialog
        id="assign-dialog"
        keepMounted
        open={SuggestionDialogOpen}
        onClose={handleSuggestionDialogClose}
        stakeholder={stakeholder}
        setToast={setToast}
      /> */}
      <div className={classes.name}>
        <CategoryTile categories={categories} />
        <h3 style={{ margin: 0, marginLeft: '8px' }}>{stakeholder.name}</h3>
      </div>
      <p>
        {categories.length > 1 ?
          <span className={classes.categoryName}>
            <span className={classes.pantry}>Food Pantry</span>
            {' '}&amp;{' '}
            <span className={classes.meal}>Meal Program</span>
          </span> :
          <span className={clsx(classes.categoryName, categories[0].name === 'Food Pantry' ? classes.pantry : classes.meal)}>
            {categories[0].name}
          </span>
        }
        {stakeholder.foodBakery && <span>Bakery</span>}
        {stakeholder.foodDairy && <span>Dairy</span>}
        {stakeholder.foodDryGoods && <span>Dry Goods</span>}
        {stakeholder.foodMeat && <span>Meat</span>}
        {stakeholder.foodPrepared && <span>Prepared Meals</span>}
      </p>
      <div className={classes.topInfo}>
        <div className={classes.info}>
          <span>{stakeholder.address1}</span>
          <div>
            {stakeholder.city} {stakeholder.zip}
          </div>
          <div className={classes.label}>
            {stakeholder.inactiveTemporary ||
            stakeholder.inactive ? (
              <em className={classes.closedLabel}>
                {stakeholder.inactiveTemporary
                  ? "Temporarily Closed"
                  : "Closed"}
              </em>
            ) : null}
          </div>
        </div>
        <div>
          {stakeholder.distance >= 10
            ? stakeholder.distance
                .toString()
                .substring(0, 3)
                .padEnd(4, "0")
            : stakeholder.distance.toString().substring(0, 3)}{" "}
          mi
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <div className={classes.buttons}>
          <LabelButton
            onClick={() =>
              window.open(
                getGoogleMapsUrl(
                  stakeholder.zip,
                  stakeholder.address1,
                  stakeholder.address2 || null
                )
              )
            }
            label="Directions"
          >
            <DirectionsIcon />
          </LabelButton>
          {mainNumber && (
            <LabelButton
              onClick={() => window.open(`tel:${mainNumber.value}`)}
              label="Call"
            >
              <CallIcon />
            </LabelButton>
          )}
          {stakeholder.website &&
            <a
              href={stakeholder.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LabelButton label="Website">
                <WebsiteIcon />
              </LabelButton>
            </a>
          }
          <LabelButton label="Update?">
            <EditIcon />
          </LabelButton>
          <LabelButton label="Share">
            <ShareIcon />
          </LabelButton>
          {stakeholder.email &&
            <a
              href={"mailto:" + stakeholder.email}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LabelButton label="Email">
                <EmailIcon />
              </LabelButton>
            </a>
          }
          {stakeholder.instagram &&
            <a
              href={stakeholder.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LabelButton label="Instagram">
                <InstagramIcon />
              </LabelButton>
            </a>
          }
          {stakeholder.facebook &&
            <a
              href={stakeholder.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LabelButton label="Facebook">
                <FacebookIcon />
              </LabelButton>
            </a>
          }
        </div>
      </div>
      {stakeholder.verificationStatusId === VERIFICATION_STATUS.VERIFIED &&
        <p>
          Last updated:{" "}
          {dayjs(modifiedDate).format("MMM DD, YYYY")}
        </p>
      }
      {stakeholder.hours ? (
        <>
          <h2 className={classes.title}>Hours</h2>
          <div className={classes.hoursContainer}>
            {stakeholder.hours &&
            stakeholder.hours.length > 0 ? (
              stakeholder.hours.sort(hoursSort).map((hour) => (
                <div
                  key={JSON.stringify(hour)}
                  className={classes.singleHourContainer}
                >
                  <span>
                    {hour.week_of_month === 5
                      ? "Last " + hour.day_of_week
                      : hour.week_of_month === 1
                      ? "1st " + hour.day_of_week
                      : hour.week_of_month === 2
                      ? "2nd " + hour.day_of_week
                      : hour.week_of_month === 3
                      ? "3rd " + hour.day_of_week
                      : hour.week_of_month === 4
                      ? "4th " + hour.day_of_week
                      : hour.day_of_week}
                  </span>
                  <span>
                    {standardTime(hour.open)}-{standardTime(hour.close)}
                  </span>
                </div>
              ))
            ) : (
              <span className={classes.fontSize}>No hours on record</span>
            )}
          </div>
        </>
      ) : null}

      {numbers.length > 1 &&
        <>
          <h2 className={classes.title}>All phone numbers</h2>
          <div className={classes.numbers}>{numbers}</div>
        </>
      }

      <h2 className={classes.title}>Eligibility/Requirements</h2>
      {stakeholder.requirements ? (
        <span className={classes.fontSize}>
          {stakeholder.requirements}
        </span>
      ) : (
        <span className={classes.fontSize}>No special requirements</span>
      )}

      <h2 className={classes.title}>Languages</h2>
      {stakeholder.languages ? (
        <span className={classes.fontSize}>
          {stakeholder.languages}
        </span>
      ) : (
        <span className={classes.fontSize}>No information on languages.</span>
      )}

      <h2 className={classes.title}>Notes</h2>
      {stakeholder.notes ? (
        <span className={classes.fontSize}>{stakeholder.notes}</span>
      ) : (
        <span className={classes.fontSize}>No notes to display.</span>
      )}

      <h2 className={classes.title}>Covid Notes</h2>
      {stakeholder.covidNotes ? (
        <span className={classes.fontSize}>
          {stakeholder.covidNotes}
        </span>
      ) : (
        <span className={classes.fontSize}>No covid notes to display.</span>
      )}

      {stakeholder.services ? (
        <>
          <h2 className={classes.title}>Services</h2>
          <span className={classes.fontSize}>
            {stakeholder.services}
          </span>
        </>
      ) : null}

      {stakeholder.items ? (
        <>
          <h2 className={classes.title}>Items Available</h2>
          <span className={classes.fontSize}>{stakeholder.items}</span>
        </>
      ) : null}
      <Fab
        onClick={() => onSelectStakeholder(null)}
        className={classes.back}
        color="primary"
        size="small"
      >
        <BackIcon fill="white" />
      </Fab>
    </div>
  );
};

export default StakeholderDetails;
