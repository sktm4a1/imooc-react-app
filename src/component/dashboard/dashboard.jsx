import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { NavBar } from "antd-mobile";
import NavLinkBar from "../navlink/navlink";
import Boss from "../boss/boss";
import Genuis from "../genuis/genuis";
import User from "../user/user";
import { getMsgList, recMsg } from "../../redux/chat.redux";
import Msg from "../msg/msg";

@connect(
  (state) => state,
  { getMsgList, recMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recMsg();
    }
  }
  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genuis",
      },
      {
        path: "/genuis",
        text: "Boss",
        icon: "job",
        title: "Boss列表",
        component: Genuis,
        hide: user.type === "boss",
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg,
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User,
      },
    ];
    return (
      <div>
        <NavBar className="fix-header" mode="dark">
          {navList.find((v) => v.path === pathname) &&
            navList.find((v) => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map((v) => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}

export default Dashboard;
