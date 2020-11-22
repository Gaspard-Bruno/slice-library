import Component from './';
import model from './model';
import mocks from './mocks.json';
import { storiesOf } from '@storybook/react';

import './theme.css';

mocks.forEach((variation, index) => {
  storiesOf(model.name, Component).add(variation.name, () => (
    <Component slice={variation} withTheme={index === mocks.length - 1} />
  ));
});
