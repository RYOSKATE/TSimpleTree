// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-es6/System.Linq/Linq';
import { ILinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Enumerable';
import { assert } from 'chai';
import { StringNode } from './StringNode';
import './StringExtension';

{
  const node = new StringNode('a');
  const actual = node.Descendants().select(n => n.Value).toJoinedString('');
  assert.equal(actual, '');
  // AssertionError: expected 'actual' to equal 'expect'

}
