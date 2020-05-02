import ApiRestaurantActions from '@/actions/api/RestaurantActions';
import ApiRestaurantStore from '@/stores/api/RestaurantStore';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import Can from '@/components/Can';
import Loading from '@/components/Loading';
import React from 'react';
import RestaurantEdit from '@/components/private/restaurant/Edit';

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

class RestaurantIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      loading: true
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    ApiRestaurantActions.fetchAll();
    ApiRestaurantStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({ restaurants: data, loading: false });
        }
      })
      .on("create.201", () => {
        ApiRestaurantActions.fetchAll();
      })
      .on("delete.204", () => {
        ApiRestaurantActions.fetchAll();
      })
      .on("update.200", () => {
        ApiRestaurantActions.fetchAll();
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      ApiRestaurantActions.delete(id);
    }
    e.preventDefault();
  }

  handleClickEdit(e,id) {
    ApiRestaurantActions.show(id);
    e.preventDefault();
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <Loading loading={this.state.loading}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { field: "created_at" },
              { field: "name" },
              { field: "description" },
              { field: "address" },
              {
                render: row =>  {
                  return `${row.lat}, ${row.lon}`;
                }
              },
              {
                render: row =>  <div>
                  <IconButton
                    aria-label="delete"
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
            data={this.state.restaurants}
            title={null}
            options={{
              headerStyle: { display: 'none' },
              pageSize: 20,
              pageSizeOptions: []
            }}
          />
          <RestaurantEdit />
        </Loading>
      </div>
    );
  }
}

export default RestaurantIndex;
