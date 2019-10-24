import React from 'react';
import {
  ButtonGroup, Button, Col, Container, Row
} from 'reactstrap';
import { Link, Route } from "react-router-dom";
import ReactTable from 'react-table';
import { ReviewCreate } from './Create.js';
import ApiReviewActions from '../../../actions/api/ReviewActions.js';
import ApiReviewStore from '../../../stores/api/ReviewStore.js';
import ReviewActions from '../../../actions/ReviewActions.js';
import AuthStore from '../../../stores/api/AuthStore.js';

class ReviewIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    this.handleClickReviewNow = this.handleClickReviewNow.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    ApiReviewActions.fetchAll();
    ApiReviewStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({reviews: data});
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickReviewNow(e) {
    ReviewActions.clickReviewNow();
    e.preventDefault();
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
        Header: 'User',
        accessor: 'user',
        Cell: ({ row }) => (
          `${row._original.user.firstname}`
        )
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
        <Container className="ReviewIndex mt-5 mb-5">
          {
            AuthStore.getState().role !== null
              ? <ButtonGroup>
                  <Button className="mb-4" color="primary" size="sm" onClick={ (e) => this.handleClickReviewNow(e) }>Review now!</Button>
                </ButtonGroup>
              : null
          }
          <ReactTable
            data={data}
            TheadComponent={TheadComponent}
            columns={columns}
            minRows={0}
          />
          <ReviewCreate />
        </Container>
      </div>
    );
  }
}

export { ReviewIndex };
