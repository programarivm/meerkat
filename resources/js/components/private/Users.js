import Can from '@/components/Can';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LoremIpsum } from '@/components/common/LoremIpsum';
import UserCreate from '@/components/private/user/Create';
import UserIndex  from '@/components/private/user/Index';
import React from 'react';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
});

class Users extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={9} className={classes.control}>
          <UserIndex />
        </Grid>
        <Grid item xs={3} className={classes.control}>
          <Can I="store" a="User">
            <UserCreate />
          </Can>
          <Can not I="store" a="User">
            <LoremIpsum />
          </Can>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Users);
