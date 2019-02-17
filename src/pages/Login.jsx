import React, { PureComponent, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Row, Form, Icon, Input, Button } from "antd";
import { loginByUsername } from "api";
import { setLocal } from "@/reducers/app";
import { setToken, getToken } from "@/utils/token";
import styles from "@/style/login.less";

const FormItem = Form.Item;

@Form.create()
@connect(
  null,
  dispatch => {
    return {
      actions: bindActionCreators({ setLocal }, dispatch)
    };
  }
)
class Login extends PureComponent {
  state = {
    loading: false
  };
  startLogin = () => {
    this.setState({ loading: true });
  };
  endLogin = () => {
    this.setState({ loading: false });
  };
  handleSubmit = e => {
    const { history } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.startLogin();
        const userName = values.userName;
        const password = values.password;
        try {
          let res = await loginByUsername(userName, password);
          const data = res.data;
          setToken(data.accessToken);
        } catch (e) {}
        setTimeout(() => {
          this.endLogin();
          history.push("/");
        }, 2000);
      }
    });
  };
  componentWillMount() {
    const { history } = this.props;
    let token = getToken();
    if (token) {
      history.push("/");
    }
  }
  render() {
    const { form, actions } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            {/*<img alt='logo' src={config.logoPath}/>*/}
            <span>{Config.siteName}</span>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem hasFeedback>
              {getFieldDecorator("userName", {
                initialValue: "admin",
                rules: [{ required: true, message: "请输入登录账号!" }]
              })(<Input placeholder={`Username`} />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator("password", {
                initialValue: "123",
                rules: [{ required: true, message: "请输入密码!" }]
              })(<Input type="password" placeholder={`Password`} />)}
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType={"submit"}
                loading={this.state.loading}
              >
                <FormattedMessage id="intl.signIn" />
              </Button>
              <p>
                <span>Username：admin</span>
                <span>Password：123</span>
              </p>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <footer className={styles["footer-view"]}>
            <div className={styles["footer-view-links"]}>
              <span>
                <a
                  title="github"
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/sosout/react-antd-admin"
                >
                  <Icon type="github" />
                </a>
              </span>
              <span
                onClick={() => {
                  actions.setLocal("en");
                }}
              >
                English
              </span>
              <span
                onClick={() => {
                  actions.setLocal("zh");
                }}
              >
                中文
              </span>
            </div>
            <div className={styles["footer-copyright"]}>
              Ant Design Admin © 2019 sosout
            </div>
          </footer>
        </div>
      </Fragment>
    );
  }
}

export default Login;
