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
  it('TraverseSingles', () => {
    const a = new StringNode('a');
    const b = new StringNode('b');
    const c = new StringNode('c');
    const d = new StringNode('d');
    const e = new StringNode('e');
    const f = new StringNode('f');
    const g = new StringNode('g');
    // a - b - c - d - e
    //   - g         - f
    a.AddFirst(b);
    a.AddLast(g);
    b.AddFirst(c);
    c.AddFirst(d);
    d.AddFirst(e);
    d.AddLast(f);

    assert.equal(b.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'cd');
    assert.equal(b.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'bcd');
    assert.equal(c.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'d');
    assert.equal(c.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'cd');

    assert.equal(b.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
    assert.equal(b.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'b');
    assert.equal(c.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'b');
    assert.equal(c.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'cb');
    assert.equal(d.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'cb');
    assert.equal(d.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'dcb');
    assert.equal(e.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
    assert.equal(e.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'e');
  });
});
