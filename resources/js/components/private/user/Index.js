import React from 'react';
import {
  Button, ButtonGroup, Container
} from 'reactstrap';
import ReactTable from 'react-table'
import { UserEdit } from './Edit.js';
import AuthStore from '../../../stores/api/AuthStore.js';
import ApiUserActions from '../../../actions/api/UserActions.js';
import ApiUserStore from '../../../stores/api/UserStore.js';

class UserIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    ApiUserActions.fetchAll();
    ApiUserStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({ users: data });
        }
      })
      .on("create.201", () => {
        ApiUserActions.fetchAll();
      })
      .on("delete.204", () => {
        ApiUserActions.fetchAll();
      })
      .on("update.200", () => {
        ApiUserActions.fetchAll();
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      ApiUserActions.delete(id);
    }
    e.preventDefault();
  }

  handleClickEdit(e,id) {
    ApiUserActions.show(id);
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
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleClickEdit(e,row._original.id) }>Edit</Button>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleClickDelete(e,row._original.id) }>Delete</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container className="mt-3 mb-5">
        <p>There are {this.state.users.length} users</p>
        <ReactTable
          data={data}
          columns={AuthStore.getState().role === 'ROLE_ADMIN' ? roleAdminColumns : columns}
          minRows={0}
        />
        <UserEdit />
      </Container>
    );
  }
}

export { UserIndex };
