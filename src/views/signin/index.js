import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { IMAGES_ADDRESS } from '../../utils/constants';
import request from '../../utils/request';
import classnames from 'classnames';

class Signin extends Component {
    state = {
        username: '',
        password: '',
        imgName: '',
        errorTip: '',
        code: '',
    }

    inputValue = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    submit = () => {
        const {
            username,
            password,
            code,
        } = this.state;
        if (username && password) {
            request('/user/login', {
                body: {
                    username,
                    password,
                    code,
                }
            }).then(json => {
                if (json.code === 10000000) {
                    sessionStorage.setItem('account', JSON.stringify(json.data));
                    this.props.history.push('/user');
                } else {
                    this.setState({ errorTip: json.msg });
                    if (json.data === 10001001) {
                        this.getValidImg();
                    }
                }
            });
        }
    }

    getValidImg = () => {
        const { username } = this.state;
        request('/valid/createCode', {
            method: 'GET',
            body: {
                username,
                type: 'login',
            }
        }).then(json => {
            if (json.code === 10000000) {
                this.setState({ imgName: json.data.imageName });
            } else {
                message.error(json.msg);
            }
        })
    }

    render() {
        const {
            username,
            password,
            errorTip,
            code,
            imgName,
        } = this.state;
        const ok = this.state.username && this.state.password;
        return (
            <div className="content">
                <div className="form-box">
                    <h1>????????????</h1>
                    <div className="attention">
                        <i className="iconfont icon-zhuyishixiang"></i>???????????????????????? <strong>https://www.bbex.one</strong>
                    </div>
                    <div className="safety-site"><i className="iconfont icon-suo1"></i><em>https</em>://www.bbex.one</div>
                    <p className="error-tip">{errorTip && <i className="iconfont icon-zhuyishixiang"></i>}{errorTip}</p>
                    <ul className="form-list">
                        <li>
                            <i className="iconfont icon-youxiang"></i>
                            <input type="text" className="text" id="username" value={username} onChange={this.inputValue} placeholder="??????" />
                        </li>
                        <li>
                            <i className="iconfont icon-suo"></i>
                            <input type="password" className="text" id="password" value={password} onChange={this.inputValue} placeholder="??????" />
                        </li>
                        {imgName && (
                            [<li>
                                <i className="iconfont icon-yanzhengma2"></i>
                                <input
                                    type="text"
                                    className="text"
                                    id="code"
                                    value={code}
                                    onChange={this.inputValue}
                                    placeholder="?????????"
                                />
                                <img
                                    src={`${IMAGES_ADDRESS}/image/view/${imgName}`}
                                    className="inner-graphic"
                                    alt="???????????????"
                                    onClick={this.getValidImg}
                                />
                            </li>,
                            <li style={{ textAlign: 'right' }}>
                                ???????????????????????????
                            </li>]
                        )}
                        <li><input type="submit" className={classnames({
                            button: true,
                            disabled: !ok
                        })} onClick={this.submit} value="??????" /></li>
                        <li className="clear"><Link to="/reset" className="pull-left">???????????????</Link> <span className="pull-right">???????????????<Link to="/register">????????????</Link></span></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Signin;