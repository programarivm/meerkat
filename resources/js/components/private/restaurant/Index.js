import React from 'react';
import {
  Button, ButtonGroup, Container, Table
} from 'reactstrap';
import RestaurantActions from '../../../actions/RestaurantActions.js';
import RestaurantStore from '../../../stores/RestaurantStore.js';

class RestaurantIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    RestaurantActions.fetchAll();
    RestaurantStore.on("restaurant_fetch_all_200", (data) => {
      this.setState({ restaurants: data });
    });
    RestaurantStore.on("restaurant_create_201", () => {
      RestaurantActions.fetchAll();
    });
    RestaurantStore.on("restaurant_delete_204", () => {
      RestaurantActions.fetchAll();
    });
  }

  handleDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      RestaurantActions.delete(id);
    }
    e.preventDefault();
  }

  render() {
    return (
      <Container className="mt-3 mb-5">
        <Table>
          <thead>
            <tr>
              <th colSpan="6" className="text-center">There are {this.state.restaurants.length} awesome restaurants in this list</th>
            </tr>
            <tr>
              <th>Created at</th>
              <th>Name</th>
              <th>Description</th>
              <th>Address</th>
              <th>Coordinates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.restaurants.map( (item, i) => <tr key={i} className="mt-5">
                <td>{item.created_at}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.address}</td>
                <td>{item.lat}, {item.lon}</td>
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
      </Container>
    );
  }
}

export { RestaurantIndex };
