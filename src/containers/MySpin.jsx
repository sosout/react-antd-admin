import React from "react";
import { Spin } from "antd";
import { connect } from "react-redux";

@connect(
  state => {
    const { spinLoading } = state.app;
    return { spinLoading };
  },
  null
)
class MySpin extends React.PureComponent {
  render() {
    const PageRouters = this.props.pageRouters;
    return (
      <Spin size="large" spinning={this.props.spinLoading}>
        <PageRouters />
      </Spin>
    );
  }
}

export default MySpin;
