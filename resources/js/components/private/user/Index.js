import React from 'react';
import {
  Button, ButtonGroup, Container
} from 'reactstrap';
import ReactTable from 'react-table'
import { UserEdit } from './Edit.js';
import GlobalStore from '../../../stores/GlobalStore.js';
import UserActions from '../../../actions/UserActions.js';
import UserStore from '../../../stores/UserStore.js';

class UserIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    UserActions.fetchAll();
    UserStore.on("user_fetch_all_200", (data) => {
      if (this._isMounted) {
        this.setState({ users: data });
      }
    });
    UserStore.on("user_create_201", () => {
      UserActions.fetchAll();
    });
    UserStore.on("user_delete_204", () => {
      UserActions.fetchAll();
    });
    UserStore.on("user_update_200", () => {
      UserActions.fetchAll();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      UserActions.delete(id);
    }
    e.preventDefault();
  }

  handleShow(e,id) {
    UserActions.show(id);
    e.preventDefault();
  }

  render() {
    const data = this.state.users;

    const columns = [
      {
        Header: 'Created at',
        accessor: 'created_at'
      },
      {
        Header: 'First name',
        accessor: 'firstname'
      },
      {
        Header: 'Surname',
        accessor: 'surname'
      },
      {
        Header: 'Date of birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Phone number',
        accessor: 'phone_number'
      },
      {
        Header: 'Email',
        accessor: 'email'
      }
    ];

    const roleAdminColumns = [
      ...columns,
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <ButtonGroup>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleShow(e,row._original.id) }>Edit</Button>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleDelete(e,row._original.id) }>Delete</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container className="mt-3 mb-5">
        <p>There are {this.state.users.length} users</p>
        <ReactTable
          data={data}
          columns={GlobalStore.getState().gui.role === 'ROLE_ADMIN' ? roleAdminColumns : columns}
          minRows={0}
        />
        <UserEdit />
      </Container>
    );
  }
}

export { UserIndex };
