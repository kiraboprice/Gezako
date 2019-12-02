import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

class ShowPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      report: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('reports').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          report: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('reports').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Gezako</Link></h4>
            <h3 class="panel-title">
              {this.state.report.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Service:</dt>
              <dd>{this.state.report.service}</dd>
              <dt>Feature:</dt>
              <dd>{this.state.report.feature}</dd>
              <dt>Spock Report:</dt>
              <dd>{this.state.report.fileDownLoadUrl}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowPage;
