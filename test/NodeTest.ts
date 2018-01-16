// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-es6/System.Linq/Linq';
import { ILinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Enumerable';
import { assert } from 'chai';
import { StringNode } from '../src/StringNode';
import '../src/StringExtension';

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
