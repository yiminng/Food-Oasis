import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
// import StakeholderDetails from "components/Stakeholder/StakeholderDetails";
import { makeStyles } from "@material-ui/core/styles";

import StakeholderPreview from "components/stakeholder/preview";

const useStyles = makeStyles(({ palette }) => ({
  preview: {
    padding: '0 1em',
    borderBottom: `0.2em solid ${palette.inactive.light}`,
  },
}));

const Row = ({ index, style, data }) => {
  const classes = useStyles();
  const { stakeholders, onSelectStakeholder } = data
  const stakeholder = stakeholders[index]
  return (
    <div
      className={classes.preview}
      style={style}
    >
      <StakeholderPreview
        stakeholder={stakeholder}
        onSelectStakeholder={onSelectStakeholder}
      />
    </div>
  );
}

const List = ({ stakeholders, onSelectStakeholder }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          itemCount={stakeholders.length}
          itemSize={150}
          width={width}
          itemData={{
            stakeholders,
            onSelectStakeholder
          }}
        >
          {Row}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default List;
