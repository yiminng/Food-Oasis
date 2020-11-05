import { useRef, useState, useEffect } from "react";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
// import StakeholderDetails from "components/Stakeholder/StakeholderDetails";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import StakeholderPreview from "components/stakeholder/preview";

const useStyles = makeStyles((theme) => ({
  preview: {
    padding: '0 1em',
    borderBottom: " .2em solid #f1f1f1",
  },
}));

const Row = ({ index, style, data }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.preview}
      style={style}
    >
      <StakeholderPreview
        stakeholder={data[index]}
        doSelectStakeholder={() => {}}
      />
    </div>
  );
}

const List = ({
  stakeholders,
}) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={stakeholders.length}
          itemSize={150}
          width={width}
          itemData={stakeholders}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default List;
