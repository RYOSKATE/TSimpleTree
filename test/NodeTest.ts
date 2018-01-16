// tslint:disable-next-line:import-name
import { assert } from 'chai';
import { StringNode } from '../src/index';

// npm run test
describe('CreateN-Node', () => {
  const node = new StringNode('a');
  it('Create1Node1', () => {
    const actual = node.toString().normalizeNewLine();
    assert.equal(actual, 'a\n');
  });
  it('Create1Node2', () => {
    const actual = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actual, '');
  });
});
