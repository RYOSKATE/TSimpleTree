// tslint:disable-next-line:import-name
import { assert } from 'chai';
import { StringNode } from '../src/index';

// npm run test
describe('Create1Node', () => {
  const node = new StringNode('a');
  it(String.raw`node.toString() == 'a\n'`, () => {
    assert.equal(node.toString(), 'a\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == ''`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), '');
  });
});
describe('Create2Node', () => {
  const node = new StringNode('a');
  node.AddFirst(new StringNode('b'));
  it(String.raw`node.toString() == 'a\\n  b\\n'`, () => {
    assert.equal(node.toString(), 'a\n  b\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'b'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'b');
  });
});
describe('Create3Node', () => {
  const node = new StringNode('a');
  node.AddLast(new StringNode('b'));
  node.AddFirst(new StringNode('c'));
  it(String.raw`node.toString() == 'a\n  c\n  b\n'`, () => {
    assert.equal(node.toString(), 'a\n  c\n  b\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'cb'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'cb');
  });
});
describe('Create4Node', () => {
  const node = new StringNode('a');
  node.AddLast(new StringNode('b'));
  node.AddFirst(new StringNode('c'));
  node.AddLast(new StringNode('d'));
  it(String.raw`node.toString() == 'a\n  c\n  b\n  d\n'`, () => {
    assert.equal(node.toString(), 'a\n  c\n  b\n  d\n'.normalizeNewLine());
  });
  it(`node.Descendants().select(n => n.Value).toJoinedString('') == 'cbd'`, () => {
    assert.equal(node.Descendants().select(n => n.Value).toJoinedString(''), 'cbd');
  });
});
describe('Replace', () => {
  it(`a.DescendantsAndSelf().select(n => n.Value).toJoinedString('') == 'ad'`, () => {
    const a = new StringNode('a');
    const b = new StringNode('b');
    const c = new StringNode('c');
    // a - b - c
    a.AddFirst(b);
    b.AddFirst(c);
    b.Replace(new StringNode('d'));
    assert.equal(a.DescendantsAndSelf().select(n => n.Value).toJoinedString(''), 'ad');
  });
});
describe('CreateTreeAndTraverse', () => {

  // a - e 
  //     d        
  //     b - g - k
  //             h
  //             j
  //       - f - l
  //             i
  //             m
  //     c      
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

  it(`a.toString()`, () => {
    assert.equal(a.toString(), 
                 'a\n  e\n  d\n  b\n    g\n      k\n      h\n      j\n    f\n      l\n      i\n      m\n  c\n'
                 .normalizeNewLine());
  });
  it(`a.LengthFromDeepestChild, 3`, () => {
    assert.equal(a.LengthFromDeepestChild, 3);
  });
  it(`b.LengthFromDeepestChild, 2`, () => {
    assert.equal(b.LengthFromDeepestChild, 2);
  });
  it(`c.LengthFromDeepestChild, 0`, () => {
    assert.equal(c.LengthFromDeepestChild, 0);
  });
  it(`d.LengthFromDeepestChild, 0`, () => {
    assert.equal(d.LengthFromDeepestChild, 0);
  });
  it(`e.LengthFromDeepestChild, 0`, () => {
    assert.equal(e.LengthFromDeepestChild, 0);
  });
  it(`f.LengthFromDeepestChild, 1`, () => {
    assert.equal(f.LengthFromDeepestChild, 1);
  });
  it(`g.LengthFromDeepestChild, 1`, () => {
    assert.equal(g.LengthFromDeepestChild, 1);
  });
  it(`h.LengthFromDeepestChild, 0`, () => {
    assert.equal(h.LengthFromDeepestChild, 0);
  });
  it(`i.LengthFromDeepestChild, 0`, () => {
    assert.equal(i.LengthFromDeepestChild, 0);
  });
  it(`j.LengthFromDeepestChild, 0`, () => {
    assert.equal(j.LengthFromDeepestChild, 0);
  });
  it(`k.LengthFromDeepestChild, 0`, () => {
    assert.equal(k.LengthFromDeepestChild, 0);
  });
  it(`l.LengthFromDeepestChild, 0`, () => {
    assert.equal(l.LengthFromDeepestChild, 0);
  });
  it(`m.LengthFromDeepestChild, 0`, () => {
    assert.equal(m.LengthFromDeepestChild, 0);
  });

  it(`a.Descendants().select(n => n.Value).toJoinedString(''),'edbgkhjflimc'`, () => {
    assert.equal(a.Descendants().select(n => n.Value).toJoinedString(''),'edbgkhjflimc');
  });
  it(`e.Descendants().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(e.Descendants().select(n => n.Value).toJoinedString(''),'');
  });
  it(`d.Descendants().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(d.Descendants().select(n => n.Value).toJoinedString(''),'');
  });
  it(`b.Descendants().select(n => n.Value).toJoinedString(''),'gkhjflim'`, () => {
    assert.equal(b.Descendants().select(n => n.Value).toJoinedString(''),'gkhjflim');
  });
  it(`c.Descendants().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(c.Descendants().select(n => n.Value).toJoinedString(''),'');
  });

  it(`a.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'aedbgkhjflimc'`, () => {
    assert.equal(a.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'aedbgkhjflimc');
  });
  it(`e.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'e'`, () => {
    assert.equal(e.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'e');
  });
  it(`d.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'d'`, () => {
    assert.equal(d.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'d');
  });
  it(`b.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'bgkhjflim'`, () => {
    assert.equal(b.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'bgkhjflim');
  });
  it(`c.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'c'`, () => {
    assert.equal(c.DescendantsAndSelf().select(n => n.Value).toJoinedString(''),'c');
  });

  it(`a.Descendants(2).select(n => n.Value).toJoinedString(''),'edbgfc'`, () => {
    assert.equal(a.Descendants(2).select(n => n.Value).toJoinedString(''),'edbgfc');
  });
  it(`e.Descendants(2).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(e.Descendants(2).select(n => n.Value).toJoinedString(''),'');
  });
  it(`d.Descendants(2).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(d.Descendants(2).select(n => n.Value).toJoinedString(''),'');
  });
  it(`b.Descendants(2).select(n => n.Value).toJoinedString(''),'gkhjflim'`, () => {
    assert.equal(b.Descendants(2).select(n => n.Value).toJoinedString(''),'gkhjflim');
  });
  it(`c.Descendants(2).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(c.Descendants(2).select(n => n.Value).toJoinedString(''),'');
  });
  it(`b.Descendants(0).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(b.Descendants(0).select(n => n.Value).toJoinedString(''),'');
  });

  it(`a.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'aedbgfc'`, () => {
    assert.equal(a.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'aedbgfc');
  });
  it(`e.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'e'`, () => {
    assert.equal(e.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'e');
  });
  it(`d.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'d'`, () => {
    assert.equal(d.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'d');
  });
  it(`b.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'bgkhjflim'`, () => {
    assert.equal(b.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'bgkhjflim');
  });
  it(`c.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'c'`, () => {
    assert.equal(c.DescendantsAndSelf(2).select(n => n.Value).toJoinedString(''),'c');
  });
  it(`b.DescendantsAndSelf(0).select(n => n.Value).toJoinedString(''),'b'`, () => {
    assert.equal(b.DescendantsAndSelf(0).select(n => n.Value).toJoinedString(''),'b');
  });

  it(`a.Siblings().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(a.Siblings().select(n => n.Value).toJoinedString(''),'');
  });
  it(`k.Siblings().select(n => n.Value).toJoinedString(''),'hj'`, () => {
    assert.equal(k.Siblings().select(n => n.Value).toJoinedString(''),'hj');
  });
  it(`h.Siblings().select(n => n.Value).toJoinedString(''),'kj'`, () => {
    assert.equal(h.Siblings().select(n => n.Value).toJoinedString(''),'kj');
  });
  it(`j.Siblings().select(n => n.Value).toJoinedString(''),'kh'`, () => {
    assert.equal(j.Siblings().select(n => n.Value).toJoinedString(''),'kh');
  });
  it(`i.Siblings().select(n => n.Value).toJoinedString(''),'lm'`, () => {
    assert.equal(i.Siblings().select(n => n.Value).toJoinedString(''),'lm');
  });

  it(`a.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'a'`, () => {
    assert.equal(a.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'a');
  });
  it(`k.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj'`, () => {
    assert.equal(k.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
  });
  it(`h.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj'`, () => {
    assert.equal(h.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
  });
  it(`j.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj'`, () => {
    assert.equal(j.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'khj');
  });
  it(`i.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'lim'`, () => {
    assert.equal(i.SiblingsAndSelf().select(n => n.Value).toJoinedString(''),'lim');
  });

  it(`a.Siblings(1).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(a.Siblings(1).select(n => n.Value).toJoinedString(''),'');
  });
  it(`k.Siblings(1).select(n => n.Value).toJoinedString(''),'h'`, () => {
    assert.equal(k.Siblings(1).select(n => n.Value).toJoinedString(''),'h');
  });
  it(`h.Siblings(1).select(n => n.Value).toJoinedString(''),'kj'`, () => {
    assert.equal(h.Siblings(1).select(n => n.Value).toJoinedString(''),'kj');
  });
  it(`j.Siblings(1).select(n => n.Value).toJoinedString(''),'h'`, () => {
    assert.equal(j.Siblings(1).select(n => n.Value).toJoinedString(''),'h');
  });
  it(`i.Siblings(1).select(n => n.Value).toJoinedString(''),'lm'`, () => {
    assert.equal(i.Siblings(1).select(n => n.Value).toJoinedString(''),'lm');
  });
  it(`i.Siblings(0).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(i.Siblings(0).select(n => n.Value).toJoinedString(''),'');
  });

  it(`a.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'a'`, () => {
    assert.equal(a.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'a');
  });
  it(`k.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'kh'`, () => {
    assert.equal(k.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'kh');
  });
  it(`h.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'khj'`, () => {
    assert.equal(h.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'khj');
  });
  it(`j.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'hj'`, () => {
    assert.equal(j.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'hj');
  });
  it(`i.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'lim'`, () => {
    assert.equal(i.SiblingsAndSelf(1).select(n => n.Value).toJoinedString(''),'lim');
  });
  it(`i.SiblingsAndSelf(0).select(n => n.Value).toJoinedString(''),'i'`, () => {
    assert.equal(i.SiblingsAndSelf(0).select(n => n.Value).toJoinedString(''),'i');
  });

  it(`i.Ancestors().select(n => n.Value).toJoinedString(''),'fba'`, () => {
    assert.equal(i.Ancestors().select(n => n.Value).toJoinedString(''),'fba');
  });
  it(`i.Ancestors(3).select(n => n.Value).toJoinedString(''),'fba'`, () => {
    assert.equal(i.Ancestors(3).select(n => n.Value).toJoinedString(''),'fba');
  });
  it(`i.Ancestors(2).select(n => n.Value).toJoinedString(''),'fb'`, () => {
    assert.equal(i.Ancestors(2).select(n => n.Value).toJoinedString(''),'fb');
  });
  it(`i.Ancestors(1).select(n => n.Value).toJoinedString(''),'f'`, () => {
    assert.equal(i.Ancestors(1).select(n => n.Value).toJoinedString(''),'f');
  });
  it(`i.Ancestors(0).select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(i.Ancestors(0).select(n => n.Value).toJoinedString(''),'');
  });

  it(`i.AncestorsAndSelf().select(n => n.Value).toJoinedString(''),'ifba'`, () => {
    assert.equal(i.AncestorsAndSelf().select(n => n.Value).toJoinedString(''),'ifba');
  });
  it(`i.AncestorsAndSelf(3).select(n => n.Value).toJoinedString(''),'ifba'`, () => {
    assert.equal(i.AncestorsAndSelf(3).select(n => n.Value).toJoinedString(''),'ifba');
  });
  it(`i.AncestorsAndSelf(2).select(n => n.Value).toJoinedString(''),'ifb'`, () => {
    assert.equal(i.AncestorsAndSelf(2).select(n => n.Value).toJoinedString(''),'ifb');
  });
  it(`i.AncestorsAndSelf(1).select(n => n.Value).toJoinedString(''),'if'`, () => {
    assert.equal(i.AncestorsAndSelf(1).select(n => n.Value).toJoinedString(''),'if');
  });
  it(`i.AncestorsAndSelf(0).select(n => n.Value).toJoinedString(''),'i'`, () => {
    assert.equal(i.AncestorsAndSelf(0).select(n => n.Value).toJoinedString(''),'i');
  });

  it(`f.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'c'`, () => {
    assert.equal(f.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'c');
  });
  it(`f.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'fc'`, () => {
    assert.equal(f.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'fc');
  });
  it(`f.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'gbdea'`, () => {
    assert.equal(f.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'gbdea');
  });
  it(`f.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'fgbdea'`, () => {
    assert.equal(f.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'fgbdea');
  });

  it(`h.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'jfc'`, () => {
    assert.equal(h.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''),'jfc');
  });
  it(`h.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'hjfc'`, () => {
    assert.equal(h.AncestorsAndSiblingsAfterSelfAndSelf().select(n => n.Value).toJoinedString(''),'hjfc');
  });
  it(`h.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'kgbdea'`, () => {
    assert.equal(h.AncestorsAndSiblingsBeforeSelf().select(n => n.Value).toJoinedString(''),'kgbdea');
  });
  it(`h.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'hkgbdea'`, () => {
    assert.equal(h.AncestorsAndSiblingsBeforeSelfAndSelf().select(n => n.Value).toJoinedString(''),'hkgbdea');
  });
});
describe('TraverseSingles', () => {
  const a = new StringNode('a');
  const b = new StringNode('b');
  const c = new StringNode('c');
  const d = new StringNode('d');
  const e = new StringNode('e');
  const f = new StringNode('f');
  const g = new StringNode('g');
  // a - b - c - d - e
  //   - g - f
  a.AddFirst(b);
  a.AddLast(g);
  b.AddFirst(c);
  c.AddFirst(d);
  d.AddFirst(e);
  d.AddLast(f);
  
  it(`b.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'cd'`, () => {
    assert.equal(b.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'cd');
  });
  it(`b.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'bcd'`, () => {
    assert.equal(b.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'bcd');
  });
  it(`c.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'d'`, () => {
    assert.equal(c.DescendantsOfSingle().select(n => n.Value).toJoinedString(''),'d');
  });
  it(`c.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'cd'`, () => {
    assert.equal(c.DescendantsOfSingleAndSelf().select(n => n.Value).toJoinedString(''),'cd');
  });

  it(`b.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(b.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
  });
  it(`b.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'b'`, () => {
    assert.equal(b.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'b');
  });
  it(`c.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'b'`, () => {
    assert.equal(c.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'b');
  });
  it(`c.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'cb'`, () => {
    assert.equal(c.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'cb');
  });
  it(`d.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'cb'`, () => {
    assert.equal(d.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'cb');
  });
  it(`d.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'dcb'`, () => {
    assert.equal(d.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'dcb');
  });
  it(`e.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),''`, () => {
    assert.equal(e.AncestorsWithSingleChild().select(n => n.Value).toJoinedString(''),'');
  });
  it(`e.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'e'`, () => {
    assert.equal(e.AncestorsWithSingleChildAndSelf().select(n => n.Value).toJoinedString(''),'e');
  });
});
