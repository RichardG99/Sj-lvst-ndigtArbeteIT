import React from 'react';
import PropTypes from 'prop-types';

class VarDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.value,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.reload = this.reload.bind(this);

        //console.log("VarDisplay", props.name)
    }

    reload() {
        // reload variable value
        const tmpProps = this.props;
        const tmpState = this.state;
        const newVal = tmpProps.eval(tmpProps.name);
        if(newVal != tmpState.currentValue)
            this.setState({ currentValue: newVal });
    }

    handleChange(event) {
        event.stopPropagation();
        const { name } = event.target;
        const { value } = event.target;
        this.setState( {currentValue: value,});
    }

    onClick(e) {
        e.stopPropagation();
        const tmpProps = this.props;
        const tmpState = this.state;
        const cmd = tmpProps.name + ":=" + tmpState.currentValue;
        console.log(cmd);
        this.setState({ currentValue: tmpProps.eval(cmd) });
    }

    render() {
        const tmpProps = this.props;
        const tmpState = this.state;
        return(
            <div>
                <label htmlFor="name">
                    {tmpProps.name}
                </label>
                <input type="text" name="value" value={tmpState.currentValue} onChange={this.handleChange} size="12"/>
                <br />
                <button type="button" onClick={this.onClick}>Update value</button>
                <button type="button" onClick={this.reload}>Reload value</button>
            </div>
        );
    }
}

VarDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    eval: PropTypes.func.isRequired,
    varChanged: PropTypes.bool.isRequired,
};

export default VarDisplay;
