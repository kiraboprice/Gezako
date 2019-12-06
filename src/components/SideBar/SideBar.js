import React from "react";
import Sidebar from "react-sidebar";
import ReportsTable from "../../views/SpockReportsPage/Sections/ReportsTable";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const sideBar = {
      // position: 'relative',
      // top: '100px',
      // left: '300px',
      // right: '0',
      // bottom: '0',
      marginTop:'10px'
    };

    return (
        //<div style={sideBar}>
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" }, root: {top: 70} }}
            docked={true}
        >
          {/*Loans*/}
          {/*<ReportsTable />*/}
          {/*<br/>*/}
          {/*<br/>*/}
          {/*<ReportsTable/>*/}
        </Sidebar>
        //</div>
    );
  }
}

export default SideBar;