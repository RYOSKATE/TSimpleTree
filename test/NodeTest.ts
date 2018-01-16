// tslint:disable-next-line:import-name
import { assert } from 'chai';
import { StringNode } from '../src/index';

// npm run test
describe('CreateN-Nodes', () => {
  it('Create1Node', () => {
    const node = new StringNode('a');
    const actual = node.toString().normalizeNewLine();
    assert.equal(actual, 'a\n');
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, '');
  });
  it('Create2Nodes', () => {
    const node = new StringNode('a');
    node.AddFirst(new StringNode('b'));
    const actual = node.toString().normalizeNewLine();
    assert.equal(actual, 'a\n  b\n');
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, 'b');
  });
});
