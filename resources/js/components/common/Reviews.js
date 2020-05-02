import { Button, ButtonGroup, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Can from '@/components/Can';
import { LoremIpsum } from "@/components/common/LoremIpsum";
import React from 'react';
import ReviewActions from '@/actions/ReviewActions';
import ReviewCreate from "@/components/common/review/Create";
import ReviewIndex from "@/components/common/review/Index";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
});

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickReviewNow = this.handleClickReviewNow.bind(this);
  }

  handleClickReviewNow(e) {
    ReviewActions.clickReviewNow();
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={9} className={classes.control}>
          <ReviewIndex />
        </Grid>
        <Grid item xs={3} className={classes.control}>
          <Can I="store" a="Review">
            <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
              <Button onClick={ (e) => this.handleClickReviewNow(e) }>Review now!</Button>
            </ButtonGroup>
            <ReviewCreate />
          </Can>
          <Can not I="store" a="Review">
            <LoremIpsum />
          </Can>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Reviews);
