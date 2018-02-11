import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FillParentSvg extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  getVisContext() {
    return {
      width: this.node.clientWidth,
      height: this.node.clientHeight,
    };
  }

  ref = (node) => {
    this.node = node;
  };

  handleResize = () => {
    if (this.props.onSizeUpdate) {
      this.props.onSizeUpdate(this.getVisContext());
    } else {
      this.forceUpdate();
    }
  };

  render() {
    const svgProps = { ...this.props };
    delete svgProps.onSizeUpdate;
    delete svgProps.children;

    svgProps.ref = this.ref;
    svgProps.style = {
      width: '100%',
      height: '100%',
    };

    const drawChildren = () => {
      const { children } = this.props;
      if (typeof children === 'function') {
        return children(this.getVisContext());
      }

      return children;
    };

    return (
      <svg {...svgProps} >
        {this.node && drawChildren()}
      </svg>
    );
  }
}

FillParentSvg.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),

  onSizeUpdate: PropTypes.instanceOf(Function),
};

FillParentSvg.defaultProps = {
  children: null,
};
