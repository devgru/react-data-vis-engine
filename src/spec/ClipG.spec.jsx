import React from 'react';
import renderer from 'react-test-renderer';

import ClipG from '../lib/components/ClipG';

describe('ClipG', () => {
  it('should work with props', () => {
    const component = renderer.create(
      <ClipG id='clip' width={100} height={100}>
        <circle/>
      </ClipG>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
