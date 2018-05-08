import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import './Calendar.css';
import moment from 'moment';
import Header from '../Header/Header';
import Body from '../Body/Body';
import EventModal from '../EventModal/EventModal';
import EventPanel from '../EventPanel/EventPanel';
import imoocForm from '../Wrapper/Wrapper';

@imoocForm
class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'date': null
    };
  }

  componentDidMount() {
    this.setState({date: moment()});
    // this.props.handleChange('date', moment());
  }

  renderPC() {
    return (
      <div className="calendar">
        {this.state.date != null && <Header
          date={this.state.date}
          // onChangeMonth={this.props.handleChange}
          onChangeMonth={(v) => {
          this.setState({'date': v})
        }}
        ></Header>}

        {this.state.date != null && <Body
          date={this.state.date}
        //   onClick={(el) => {
        //   this.handlePick(el)
        // }}
        ></Body>}

        <EventModal></EventModal>

        <EventPanel></EventPanel>
      </div>
    );
  }

  renderMB() {
    return (
      <div></div>
    );
  }

  render() {
    return (
      <div>
        <MediaQuery query="(min-device-width: 1224px)">
          {this.renderPC()}
        </MediaQuery>
        <MediaQuery query="(max-device-width: 1224px)">
          {this.renderMB()}
        </MediaQuery>
      </div>
    );
  }
}

export default Calendar;