import React from 'react';
import {
  Col, Container, Row
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import ReactTable from 'react-table';
import ReviewActions from '../../actions/ReviewActions.js';
import ReviewStore from '../../stores/ReviewStore.js';
import api from '../../../images/api.png';

class Reviews extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    ReviewActions.fetchAll();
    ReviewStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({reviews: data});
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const TheadComponent = props => null;

    const data = this.state.reviews;

    const columns = [
      {
        Header: 'Created at',
        accessor: 'created_at',
        Cell: ({ row }) => {
          let d = new Date(row._original.created_at);
          return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
        }
      },
      {
        Header: 'Comment',
        accessor: 'comment'
      },
      {
        Header: 'Points',
        accessor: 'points'
      }
    ];

    return (
      <div>
        <Container className="Reviews mt-5 mb-5">
          <ReactTable
            data={data}
            TheadComponent={TheadComponent}
            columns={columns}
            minRows={0}
          />
        </Container>
      </div>
    );
  }
}

export { Reviews };
