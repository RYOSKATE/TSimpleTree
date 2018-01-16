// tslint:disable-next-line:import-name
import Enumerable, { LinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Linq';
import { assert } from 'chai';
import { StringNode } from './StringNode';
import './StringExtension';

// npm run test
describe('CreateN-Node', () => {
  it('Create1Node', () => {
    const node = new StringNode('a');
    assert.equal(node.toString(), 'a\n'.normalizeNewLine());
  });
});
