import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Row, Tag, Icon, Divider, List, Badge } from "antd";

import moment from "moment";
import PropTypes from "prop-types";
import config from "../../config";

class DayView extends Component {
  filterCurrentEvents() {
    const events = [];
    const { pickDate, date, eventList } = this.props;
    const end = date.endOf("month").format("YYYY-MM-DD");
    const start = date.startOf("month").format("YYYY-MM-DD");

    for (let i = 0; i < eventList.length; i++) {
      const event = eventList[i];
      const eventMoment = moment(
        `${event.datetime.years}-${event.datetime.months + 2}-${
          event.datetime.date
        } ${event.datetime.hours}:${event.datetime.minutes}`,
        "YYYY-MM-DD HH:mm"
      );
      if (eventMoment.isSame(pickDate, "day")) {
        events.push(event);
      }
    }
    return events;
  }

  showEvent(v) {
    return `${v.datetime.date < 10 ? "0" + v.datetime.date : v.datetime.date} 
       ${config.monthNames[v.datetime.months + 1]}
       ${v.datetime.years} 
       ${v.datetime.hours < 10 ? "0" + v.datetime.hours : v.datetime.hours} :
       ${
         v.datetime.minutes < 10 ? "0" + v.datetime.minutes : v.datetime.minutes
       } - 
       ${v.name}`;
  }

  renderPC(events) {
    return (
      <div>
        <div>
          <Divider>
            <Icon type="schedule" onClick={this.props.onClick} />&nbsp;&nbsp; 
            {this.props.pickDate.format('DD MMMM')}
          </Divider>
          <List
            size="large"
            bordered
            dataSource={events}
            renderItem={(v, i) => (
              <List.Item>
                <Row>
                  <Tag color="#5CC3BF">{i + 1}</Tag>
                  <Icon type="clock-circle-o" />&nbsp;
                  <span className="event-detail">{this.showEvent(v)}</span>
                </Row>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }

  render() {
    const events = this.filterCurrentEvents();

    return <div>{this.renderPC(events)}</div>;
  }
}

export default DayView;
