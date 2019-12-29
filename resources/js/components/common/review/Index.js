import ApiReviewActions from '../../../actions/api/ReviewActions.js';
import ApiReviewStore from '../../../stores/api/ReviewStore.js';
import { Button, ButtonGroup, Container } from 'reactstrap';
import { LoremIpsum } from "../LoremIpsum.js";
import React from 'react';
import ReactTable from 'react-table';
import { ReviewCreate } from './Create.js';
import Session from '../../../Session.js';

class ReviewIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
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
      <Container className="m-3">
        <ReactTable
          data={data}
          columns={Session.get().role || Session.get().role === 'ROLE_EDITOR' ? roleEditorColumns : columns}
          minRows={0}
        />
      </Container>
    );
  }
}

export { ReviewIndex };
