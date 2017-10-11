import MarginG from '../lib/components/MarginG';

import React from 'react';
import renderer from 'react-test-renderer';

describe('MarginG', () => {
  it('should initialize at all', () => {
    const component = renderer.create(
      <MarginG>
        <circle />
      </MarginG>);
    expect(component.toJSON()).toMatchSnapshot();
  });
  
  it('should work with props', () => {
    const component = renderer.create(
      <MarginG top={10} left={10}>
        <circle />
      </MarginG>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
