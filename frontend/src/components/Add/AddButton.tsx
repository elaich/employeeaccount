import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: any): any => ({
  fab: {
    margin: theme.spacing.unit,
    float: 'right'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

let AddButton = ({classes, onClick}: any) => (
  <Fab color="primary" aria-label="Add" className={classes.fab} onClick={onClick}>
    <AddIcon />
  </Fab>
);

export default withStyles(styles)(AddButton);
