import React from 'react';
import {
  Button, ButtonGroup, Container
} from 'reactstrap';
import ReactTable from 'react-table'
import { RestaurantEdit } from './Edit.js';
import RestaurantActions from '../../../actions/RestaurantActions.js';
import RestaurantStore from '../../../stores/RestaurantStore.js';

class RestaurantIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    RestaurantActions.fetchAll();
    RestaurantStore.on("restaurant_fetch_all_200", (data) => {
      if (this._isMounted) {
        this.setState({ restaurants: data });
      }
    });
    RestaurantStore.on("restaurant_create_201", () => {
      RestaurantActions.fetchAll();
    });
    RestaurantStore.on("restaurant_delete_204", () => {
      RestaurantActions.fetchAll();
    });
    RestaurantStore.on("restaurant_update_200", () => {
      RestaurantActions.fetchAll();
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      RestaurantActions.delete(id);
    }
    e.preventDefault();
  }

  handleShow(e,id) {
    RestaurantActions.show(id);
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
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleShow(e,row._original.id) }>Edit</Button>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleDelete(e,row._original.id) }>Delete</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <Container className="mt-3 mb-5">
        <p>There are {this.state.restaurants.length} restaurants</p>
        <ReactTable
          data={data}
          columns={columns}
          minRows={0}
        />
        <RestaurantEdit />
      </Container>
    );
  }
}

export { RestaurantIndex };
