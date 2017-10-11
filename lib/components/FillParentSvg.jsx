import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash.clone';

export default class FillParentSvg extends Component {
  constructor(props) {
    super(props);
    this.handleResize = () => {
      this.props.onSizeUpdate({
        width: this.node.clientWidth,
        height: this.node.clientHeight,
      });
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const svgProps = clone(this.props);
    delete svgProps.onSizeUpdate;
    delete svgProps.children;

    svgProps.ref = (node) => { this.node = node; };
    svgProps.style = {
      width: '100%',
      height: '100%',
    };
    return (
      <svg {...svgProps} >
        {this.props.children}
      </svg>
    );
  }
}

FillParentSvg.propTypes = {
  children: PropTypes.node,

  onSizeUpdate: PropTypes.instanceOf(Function),
};

FillParentSvg.defaultProps = {
  onSizeUpdate: () => {},
  children: null,
};
