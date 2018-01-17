import React from 'react';
import renderer from 'react-test-renderer';

import FillParentSvg from '../lib/components/FillParentSvg';

const createNodeMock = e => {
  if (e.type === 'svg') {
    return {
      clientWidth: 100,
      clientHeight: 150
    };
  }
  return null;
};

describe('FillParentSvg', () => {
  it('should initialize at all', () => {
    const component = renderer.create(
      <FillParentSvg/>,
      {createNodeMock});
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should pass props', () => {
    const component = renderer.create(
      <FillParentSvg class="my-svg"/>,
      {createNodeMock});
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should report its size', () => {
    let svgSize;
    renderer.create(
      <FillParentSvg
        onSizeUpdate={size => { svgSize = size; }}
      />,
      {createNodeMock});
    expect(svgSize).toEqual({
      width: 100,
      height: 150
    });
  });
});
