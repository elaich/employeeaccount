import * as React from 'react';
import classNames from 'classnames';
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  WithStyles,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const toolbarStyles = (theme: any) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
});

interface TableToolbarProps extends WithStyles<typeof toolbarStyles> {
  deleteSelected(): void;
}

const TableToolbar = withStyles(toolbarStyles)((props: TableToolbarProps) => {
  const {deleteSelected, classes} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: true,
      })}>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Delete">
          <IconButton onClick={deleteSelected} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
});

export {TableToolbar};
