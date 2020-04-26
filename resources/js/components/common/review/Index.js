import ApiReviewActions from '../../../actions/api/ReviewActions';
import ApiReviewStore from '../../../stores/api/ReviewStore';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import Can from '../../Can';
import Loading from '../../Loading';
import React from 'react';
import starIcon from '../../../../images/star-icon.png';

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

class ReviewIndex extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      loading: true
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    ApiReviewActions.fetchAll();
    ApiReviewStore
      .on("fetch_all.200", (data) => {
        if (this._isMounted) {
          this.setState({ reviews: data, loading: false });
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
    let stars = (n) => {
      return new Array(n).fill().map((item, i) => {
        return <img key={i} src={starIcon} alt="star icon" />;
      });
    };

    return (
      <div style={{ maxWidth: "100%" }}>
        <Loading loading={this.state.loading}>
          <Can I="delete" a="Review">
            <MaterialTable
              icons={tableIcons}
              columns={[
                { field: "created_at" },
                { field: "user.firstname" },
                { field: "restaurant.name" },
                { field: "comment" },
                {
                  render: row => stars(row.points)
                },
                {
                  render: row =>
                    <div>
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
              data={this.state.reviews}
              title={null}
              options={{
                headerStyle: { display: 'none' },
                pageSize: 20,
                pageSizeOptions: []
              }}
            />
          </Can>
          <Can not I="delete" a="Review">
            <MaterialTable
              icons={tableIcons}
              columns={[
                { field: "created_at" },
                { field: "user.firstname" },
                { field: "restaurant.name" },
                { field: "comment" },
                {
                  render: row => stars(row.points)
                }
              ]}
              data={this.state.reviews}
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

  /* render() {
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
        <Loading loading={this.state.loading}>
          <Can I="delete" a="Review">
            <ReactTable
              data={data}
              columns={roleEditorColumns}
              minRows={0}
            />
          </Can>
          <Can not I="delete" a="Review">
            <ReactTable
              data={data}
              columns={columns}
              minRows={0}
            />
          </Can>
        </Loading>
      </Container>
    );
  } */
}

export default ReviewIndex;;
