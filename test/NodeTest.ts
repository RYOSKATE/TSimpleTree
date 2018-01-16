// tslint:disable-next-line:import-name
import { assert } from 'chai';
import { StringNode } from '../src/index';

// npm run test
describe('StringNodeTest', () => {
  it('Create1Node', () => {
    const node = new StringNode('a');
    const actual = node.toString();
    assert.equal(actual, 'a\n'.normalizeNewLine());
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, '');
  });
  it('Create2Nodes', () => {
    const node = new StringNode('a');
    node.AddFirst(new StringNode('b'));
    const actual = node.toString();
    assert.equal(actual, 'a\n  b\n'.normalizeNewLine());
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, 'b');
  });
  it('Create3Nodes', () => {
    const node = new StringNode('a');
    node.AddLast(new StringNode('b'));
    node.AddFirst(new StringNode('c'));
    const actual = node.toString();
    assert.equal(actual, 'a\n  c\n  b\n'.normalizeNewLine());
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, 'cb');
  });
  it('Create4Nodes', () => {
    const node = new StringNode('a');
    node.AddLast(new StringNode('b'));
    node.AddFirst(new StringNode('c'));
    node.AddLast(new StringNode('d'));
    const actual = node.toString();
    assert.equal(actual, 'a\n  c\n  b\n  d\n'.normalizeNewLine());
    const actua2 = node.Descendants().select(n => n.Value).toJoinedString('');
    assert.equal(actua2, 'cbd');
  });
  it('Replace', () => {
    const a = new StringNode('a');
    const b = new StringNode('b');
    const c = new StringNode('c');
    // a - b - c
    a.AddFirst(b);
    b.AddFirst(c);
    b.Replace(new StringNode('d'));
    const actual = a.DescendantsAndSelf().select(n => n.Value).toJoinedString('');
    assert.equal(actual, 'ad');
  });
});
