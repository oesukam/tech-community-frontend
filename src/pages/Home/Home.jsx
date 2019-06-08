import React, { Component } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import Layout from '../../containers/Layout/Layout';

import { changeName } from '../../actions/changeName';

export class Home extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout match={match}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">Home</div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ name }) => ({
  name,
});

const mapDispatchToProps = dispatch => ({
  changeName: name => dispatch(changeName(name)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
