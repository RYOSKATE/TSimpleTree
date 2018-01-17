// tslint:disable-next-line:import-name
import { StringNode } from './StringNode';
import './StringExtension';
import { assert } from 'chai';
export {
  StringNode,
};


{
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
  a.toString();
  console.log(f.AncestorsAndSiblingsAfterSelf().select(n => n.Value).toJoinedString(''));
}
