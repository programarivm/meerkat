import ApiUserActions from '../../../actions/api/UserActions';
import ApiUserStore from '../../../stores/api/UserStore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Can from '../../Can';
import Loading from '../../Loading';
import React from 'react';
import UserEdit from './Edit';

// MaterialTable
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />)
  };

class UserIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
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
          this.setState({ users: data, loading: false });
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
    return (
      <div style={{ maxWidth: "100%" }}>
        <Loading loading={this.state.loading}>
          <Can I="store" a="User">
            <MaterialTable
              icons={tableIcons}
              columns={[
                { field: "created_at" },
                { field: "firstname" },
                { field: "surname" },
                {
                  render: row =>  {
                    let d = new Date(row.date_of_birth);
                    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
                  }
                },
                { field: "phone_number" },
                { field: "email" },
                {
                  render: row =>  <div>
                    <IconButton
                      aria-label="edit"
                      color="secondary"
                      onClick={ (e) => this.handleClickEdit(e, row.id) }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={ (e) => this.handleClickDelete(e, row.id) }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                }
              ]}
              data={this.state.users}
              title={null}
              options={{
                headerStyle: { display: 'none' },
                pageSize: 20,
                pageSizeOptions: []
              }}
            />
            <UserEdit />
          </Can>
          <Can not I="store" a="User">
            <MaterialTable
              icons={tableIcons}
              columns={[
                { field: "created_at" },
                { field: "firstname" },
                { field: "surname" },
                {
                  render: row =>  {
                    let d = new Date(row.date_of_birth);
                    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
                  }
                },
                { field: "phone_number" },
                { field: "email" }
              ]}
              data={this.state.users}
              title={null}
              options={{
                headerStyle: { display: 'none' },
                pageSize: 20,
                pageSizeOptions: []
              }}
            />
          </Can>
        </Loading>
      </div>
    );
  }
}

export default UserIndex;
