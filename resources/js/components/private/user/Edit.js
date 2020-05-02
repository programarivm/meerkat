import ApiUserActions from '@/actions/api/UserActions';
import ApiUserStore from '@/stores/api/UserStore';
import { Backdrop, Button, ButtonGroup, Fade, Modal } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormInputs } from '@/components/private/user/FormInputs';
import Loading from '@/components/Loading';
import React from 'react';
import Validation from '@/components/Validation';

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

class UserEdit extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    ApiUserStore
      .on("show.200", (data) => {
        if (this._isMounted) {
          this.setState({
            id: data.id,
            user: {
              firstname: data.firstname,
              surname: data.surname,
              date_of_birth: data.date_of_birth,
              phone_number: data.phone_number,
              email: data.email,
              password: data.password
            },
            modal: {
              open: true
            }
          });
        }
      })
      .on("update.200", () => {
        if (this._isMounted) {
          this.resetState();
        }
      })
      .on("update.422", (data) => {
        if (this._isMounted) {
          this.setState({ response: data, loading: false });
        }
      })
      .on("update.error", () => {
        if (this._isMounted) {
          this.setState({ response: data, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getInitialState = () => ({
    user: {
      firstname: '',
      surname: '',
      date_of_birth: '',
      phone_number: '',
      email: '',
      password: ''
    },
    modal: {
      open: false
    },
    response: [],
    loading: false
  });

  resetState = () => {
    this.setState(this.getInitialState());
  }

  handleChange = e => {
    let user = {...this.state.user};
    user[e.target.id] = e.target.value;
    this.setState({user});
  }

  handleClickCancel(e) {
    this.resetState();
    e.preventDefault();
  }

  handleClickUpdate(e) {
    this.setState({ loading: true });
    ApiUserActions.update(this.state.id, this.state.user);
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
              <form onSubmit={ (e) => this.handleClickUpdate(e) }>
                <FormInputs {...this.state.user} handleChange={this.handleChange} />
                <ButtonGroup>
                  <Button type="submit" color="primary">Update</Button>
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

export default withStyles(styles)(UserEdit);
