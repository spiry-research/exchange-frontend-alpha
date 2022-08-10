import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Property from './property';
import Verified from './verified';
import Payment from './payment';
import Transaction from './transaction';
import Finance from './finance';
import Address from './address';
import Status from './status';
import Security from './security';
import Popup from '../../components/popup';

import './user.css';

class UserCenter extends Component {
  state = {
    popup: false
  };

  componentDidMount() {
    if (sessionStorage.getItem('account')) {
      const account = JSON.parse(sessionStorage.getItem('account'));
      if (!account.googleAuth) {
        this.setState({
          popup: (
            <Popup
              wrapClassName="verification-popup"
              cancelBtn="暂不设置"
              confirmBtn="立即设置"
              cancelHandle={this.closePopup}
              confirmHandle={() => {
                this.closePopup();
                this.props.history.push('/authentication');
              }}
            >
              <i className="iconfont icon-icon" />
              <p className="message">
                为了您的账号安全，我们强烈建议您开启二次验证。
              </p>
              <a href="/authentication" className="input-verification">
                请输入谷歌验证码
              </a>
            </Popup>
          )
        });
      }
    }
  }

  closePopup = () => {
    this.setState({ popup: false });
  };

  render() {
    const { match } = this.props;
    const { popup } = this.state;
    const account = JSON.parse(sessionStorage.getItem('account'));
    return (
      <div className="content user">
        <div className="content-inner">
          <div className="user-bar">
            <div className="user-header">
              <div className="user-avatar">
                {account.realName ? account.realName.substr(0, 1) : '?'}
              </div>
              {account.mail}
            </div>
            <div className="user-nav">
              <NavLink
                to={`${match.path}`}
                exact
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-zichan" />我的资产
              </NavLink>
              <NavLink
                to={`${match.path}/transaction`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-jiaoyi" />我的交易
              </NavLink>
              <NavLink
                to={`${match.path}/finance`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-caiwu" />财务记录
              </NavLink>
              <NavLink
                to={`${match.path}/security`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-anquanzhongxin" />安全中心
              </NavLink>
              <NavLink
                to={`${match.path}/verified`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-shimingrenzheng" />实名认证
              </NavLink>
              <NavLink
                to={`${match.path}/payment`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-zhifu" />支付绑定
              </NavLink>
              <NavLink
                to={`${match.path}/address`}
                className="user-link"
                activeClassName="active"
              >
                <i className="iconfont icon-navicon-fwdzpz" />地址管理
              </NavLink>
            </div>
          </div>
          <Route exact path={`${match.path}/`} component={Property} />
          <Route path={`${match.path}/verified`} component={Verified} />
          <Route path={`${match.path}/payment`} component={Payment} />
          <Route path={`${match.path}/transaction`} component={Transaction} />
          <Route path={`${match.path}/finance`} component={Finance} />
          <Route path={`${match.path}/address`} component={Address} />
          <Route path={`${match.path}/security`} component={Security} />
          <Route path={`${match.path}/status`} component={Status} />
        </div>
        {popup}
      </div>
    );
  }
}

export default UserCenter;
