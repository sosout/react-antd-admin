import React, { PureComponent } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";

@connect(
  state => {
    return {
      spinLoading: state.app.spinLoading
    }
  }
)
export default class MySpin extends PureComponent {
  render() {
    const { pageRouters: PageRouters,  spinLoading} = this.props;
    return (
      <Spin size="large" spinning={spinLoading}>
        <PageRouters />
      </Spin>
    );
  }
}
