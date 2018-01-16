// tslint:disable-next-line:import-name
import Enumerable, { LinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Linq';
import { assert } from 'chai';
import { StringNode } from './StringNode';
import './StringExtension';

{
  const node = new StringNode('a');
  const expect = 'a\n';
  const actual = node.toString().normalizeNewLine();
  assert.equal(actual, expect);
  // AssertionError: expected 'actual' to equal 'expect'

}
