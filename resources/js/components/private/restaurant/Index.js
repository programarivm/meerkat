import ApiRestaurantActions from '../../../actions/api/RestaurantActions.js';
import ApiRestaurantStore from '../../../stores/api/RestaurantStore.js';
import { Button, ButtonGroup, Container } from 'reactstrap';
import Loading from '../../Loading.js';
import React from 'react';
import ReactTable from 'react-table'
import { RestaurantEdit } from './Edit.js';

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
    const data = this.state.restaurants;

    const columns = [
      {
        Header: 'Created at',
        accessor: 'created_at'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'Coordinates',
        accessor: 'coordinates',
        Cell: ({ row }) => (
          `${row._original.lat}, ${row._original.lon}`
        )
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <ButtonGroup>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleClickEdit(e,row._original.id) }>Edit</Button>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleClickDelete(e,row._original.id) }>Delete</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container className="m-3">
        <Loading loading={this.state.loading}>
          <ReactTable
            data={data}
            columns={columns}
            minRows={0}
          />
        </Loading>
        <RestaurantEdit />
      </Container>
    );
  }
}

export { RestaurantIndex };
