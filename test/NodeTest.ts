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
  it('CreateTreeAndTraverse', () => {
    const a = new StringNode('a'); // 1
    const b = a.AddFirst(new StringNode('b')); // 2
    const c = a.AddLast(new StringNode('c')); // 2
    const d = a.AddFirst(new StringNode('d')); // 2
    const e = a.AddFirst(new StringNode('e')); // 2
    const f = b.AddFirst(new StringNode('f')); // 3
    const g = b.AddFirst(new StringNode('g')); // 3
    const h = g.AddLast('h'); // 4
    const i = f.AddLast('i'); // 4
    const j = h.AddNext('j'); // 4
    const k = h.AddPrevious('k'); // 4
    const l = i.AddPrevious('l'); // 4
    const m = i.AddNext('m'); // 4
    assert.equal(a.toString(), 
                 'a\n  e\n  d\n  b\n    g\n      k\n      h\n      j\n    f\n      l\n      i\n      m\n  c\n'
                 .normalizeNewLine());

    assert.equal(a.LengthFromDeepestChild, 3);
    assert.equal(b.LengthFromDeepestChild, 2);
    assert.equal(c.LengthFromDeepestChild, 0);
    assert.equal(d.LengthFromDeepestChild, 0);
    assert.equal(e.LengthFromDeepestChild, 0);
    assert.equal(f.LengthFromDeepestChild, 1);
    assert.equal(g.LengthFromDeepestChild, 1);
    assert.equal(h.LengthFromDeepestChild, 0);
    assert.equal(i.LengthFromDeepestChild, 0);
    assert.equal(j.LengthFromDeepestChild, 0);
    assert.equal(k.LengthFromDeepestChild, 0);
    assert.equal(l.LengthFromDeepestChild, 0);
    assert.equal(m.LengthFromDeepestChild, 0);
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
