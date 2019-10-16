import React from 'react';
import {
  Button, ButtonGroup, Container, Spinner, Table
} from 'reactstrap';
import UserActions from '../../../actions/UserActions.js';
import UserStore from '../../../stores/UserStore.js';

class UserIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    UserActions.fetchAll();

    UserStore.on("user_fetch_all_200", (data) => {
      this.setState({
        users: data,
        loading: false
      });
    });

    UserStore.on("user_fetch_all_error", (data) => {
      this.setState({
        loading: false
      });
    });

    UserStore.on("user_create_201", () => {
      UserActions.fetchAll();
    });

    UserStore.on("user_delete_204", () => {
      UserActions.fetchAll();
    });
  }

  handleDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      UserActions.delete(id);
    }
    e.preventDefault();
  }

  render() {
    return (
      <Container className="mt-3 mb-5">
        {
          this.state.loading
            ? <Spinner className="d-flex mx-auto m-5" color="dark" />
            : <Table>
                <thead>
                  <tr>
                    <th colSpan="7" className="text-center">There are {this.state.users.length} users in this list</th>
                  </tr>
                  <tr>
                    <th>Created at</th>
                    <th>First name</th>
                    <th>Surname</th>
                    <th>Date of birth</th>
                    <th>Phone number</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.users.map( (item, i) => <tr key={i} className="mt-5">
                      <td>{item.created_at}</td>
                      <td>{item.firstname}</td>
                      <td>{item.surname}</td>
                      <td>{item.date_of_birth}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.email}</td>
                      <td>
                        <ButtonGroup>
                          <Button outline color="primary" size="sm">Edit</Button>
                          <Button outline color="primary" size="sm" onClick={ (e) => this.handleDelete(e,item.id) }>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr> )
                  }
                </tbody>
              </Table>
        }
      </Container>
    );
  }
}

export { UserIndex };
