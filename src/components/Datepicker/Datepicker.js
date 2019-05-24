
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Datepicker extends Component {

    constructor (props) {
        super(props)
        this.state = {
            startDate: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div className = "container">
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label>Select Date: </label>
                        <DatePicker
                            selected={ this.state.startDate }
                            onChange={ this.handleChange }
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Datepicker;
