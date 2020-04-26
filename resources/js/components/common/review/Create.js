import ApiRestaurantActions from '../../../actions/api/RestaurantActions';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore';
import ApiReviewActions from '../../../actions/api/ReviewActions';
import ApiReviewStore from '../../../stores/api/ReviewStore';
import { Backdrop, Button, ButtonGroup, Fade, InputLabel, MenuItem, Modal, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Loading from '../../Loading';
import { Range } from 'react-range';
import React from 'react';
import ReviewStore from '../../../stores/ReviewStore';
import Validation from '../../Validation';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

class ReviewCreate extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ReviewStore
      .on("click.review_now", () => {
        if (this._isMounted) {
          ApiRestaurantActions.fetchAll();
        }
      });

    ApiRestaurantStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          let newState = Object.assign({}, this.state);
          newState.restaurants = data;
          newState.review.restaurant.id = data[0].id;
          newState.modal.open = true;
          this.setState(newState);
        }
      });

    ApiReviewStore
      .on("create.201", () => {
        if (this._isMounted) {
          ApiReviewActions.fetchAll();
          this.resetState();
        }
      })
      .on("create.422", (data) => {
        if (this._isMounted) {
          this.setState({ response: data });
        }
      })
      .on("create.error", (data) => {
        if (this._isMounted) {
          this.setState({ response: data });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialState = () => ({
    restaurants: [],
    review: {
      restaurant: {
        id: ''
      },
      comment: '',
      points: [3]
    },
    modal: {
      open: false
    },
    response: []
  });

  resetState = () => {
    this.setState(this.getInitialState());
  }

  handleChange = e => {
    let review = {...this.state.review};
    switch (e.target.name) {
      case 'restaurant':
        review.restaurant.id = e.target.value;
        break;
      default:
        review[e.target.id] = e.target.value;
        break;
    }
    this.setState({review});
  }

  handleClickCancel(e) {
    this.resetState();
    e.preventDefault();
  }

  handleClickSubmit(e) {
    ApiReviewActions.create(this.state.review);
    e.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.modal.open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={this.state.modal.open}>
            <div className={classes.paper}>
              <form onSubmit={ (e) => this.handleClickSubmit(e) }>
                <TextField
                  select
                  required
                  fullWidth
                  id="restaurant"
                  label="Select a restaurant"
                  name="restaurant"
                  margin="normal"
                  value={this.state.review.restaurant.id}
                  onChange={this.handleChange}
                >
                  {this.state.restaurants.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
                <InputLabel>Slide the square sincerely:</InputLabel>
                <Range
                  step={1}
                  min={1}
                  max={5}
                  values={this.state.review.points}
                  onChange={values => {
                    let newState = Object.assign({}, this.state);
                    newState.review.points = values;
                    this.setState(newState);
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#ccc'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '25px',
                        width: '25px',
                        backgroundColor: '#999'
                      }}
                    />
                  )}
                />
                <TextField
                  multiline
                  fullWidth
                  id="comment"
                  label="Tell us about your opinion"
                  name="comment"
                  margin="normal"
                  rows={4}
                  value={this.state.review.comment}
                  onChange={this.handleChange}
                />
                <ButtonGroup>
                  <Button type="submit" color="primary">Accept</Button>
                  <Button color="secondary" onClick={ (e) => this.handleClickCancel(e) }>Cancel</Button>
                </ButtonGroup>
              </form>
              <Loading loading={this.state.loading}>
                <Validation messages={this.state.response} />
              </Loading>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(ReviewCreate);
