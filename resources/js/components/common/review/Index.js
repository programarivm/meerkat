import ApiReviewActions from '../../../actions/api/ReviewActions.js';
import ApiReviewStore from '../../../stores/api/ReviewStore.js';
import AuthStore from '../../../stores/api/AuthStore.js';
import {
  Button, ButtonGroup, Col, Container, Row
} from 'reactstrap';
import React from 'react';
import ReactTable from 'react-table';
import ReviewActions from '../../../actions/ReviewActions.js';
import { ReviewCreate } from './Create.js';

class ReviewIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
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
      })
      .on("delete.204", () => {
        ApiReviewActions.fetchAll();
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleClickDelete(e,id) {
    if (confirm('Are you sure to delete this item?')) {
      ApiReviewActions.delete(id);
    }
    e.preventDefault();
  }

  handleClickReviewNow(e) {
    ReviewActions.clickReviewNow();
    e.preventDefault();
  }

  render() {
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
        Header: 'Restaurant',
        accessor: 'restaurant',
        Cell: ({ row }) => (
          `${row._original.restaurant.name}`
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

    const roleEditorColumns = [
      ...columns,
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <ButtonGroup>
            <Button outline color="primary" size="sm" onClick={ (e) => this.handleClickDelete(e,row._original.id) }>Delete</Button>
          </ButtonGroup>
        )
      }
    ];

    return (
      <div>
        <Container className="ReviewIndex mt-5 mb-5">
          {
            AuthStore.getState().role === 'ROLE_BASIC'
              ? <ButtonGroup>
                  <Button className="mb-4" color="primary" size="sm" onClick={ (e) => this.handleClickReviewNow(e) }>Review now!</Button>
                </ButtonGroup>
              : null
          }
          <ReactTable
            data={data}
            columns={AuthStore.getState().role === 'ROLE_ADMIN' || AuthStore.getState().role === 'ROLE_EDITOR' ? roleEditorColumns : columns}
            minRows={0}
          />
          <ReviewCreate />
        </Container>
      </div>
    );
  }
}

export { ReviewIndex };
