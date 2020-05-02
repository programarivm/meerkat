import Can from '@/components/Can';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { LoremIpsum } from '@/components/common/LoremIpsum';
import RestaurantCreate from '@/components/private/restaurant/Create';
import RestaurantIndex from '@/components/private/restaurant/Index';
import React from 'react';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
});

class Restaurants extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={9} className={classes.control}>
          <RestaurantIndex />
        </Grid>
        <Grid item xs={3} className={classes.control}>
          <Can I="store" a="Restaurant">
            <RestaurantCreate />
          </Can>
          <Can not I="store" a="Restaurant">
            <LoremIpsum />
          </Can>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Restaurants);
