// tslint:disable-next-line:import-name
import Enumerable, { LinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Linq';
import { IInfiniteEnumerable } from 'typescript-dotnet-es6/System.Linq/Enumerable';
import { Node } from './Node';

export class NamedNode<TNode extends NamedNode<TNode, TValue>, TValue> extends Node<TNode, TValue> {

  protected constructor(node?:TValue) {
    if (node !== undefined) {
      super(node);
    }
  }

  private name:string;
  public get Name():string {
    return this.name;
  }
  protected set(name:string) {
    this.name = name;
  }

  // #region Traversal

  public Child(name:string):TNode {
    return super.Children().where(node => node.Name === name).first();
  }

  public Ancestors(nameOrInclusiveDepth:string | number, inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth === 'number') {
      return super.Ancestors(nameOrInclusiveDepth);
    }
    return inclusiveDepth === undefined 
    ? super.Ancestors().where(node => node.Name === nameOrInclusiveDepth)
    : super.Ancestors(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public AncestorsAndSelf(nameOrInclusiveDepth:string | number, inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    if (typeof nameOrInclusiveDepth === 'number') {
      return super.AncestorsAndSelf(nameOrInclusiveDepth);
    }
    return inclusiveDepth === undefined 
    ? super.AncestorsAndSelf().where(node => node.Name === nameOrInclusiveDepth)
    : super.AncestorsAndSelf(inclusiveDepth).where(node => node.Name === nameOrInclusiveDepth);
  }

  public Children(name?:string):LinqEnumerable<TNode> {
    return name === undefined 
    ? super.Children() 
    : super.Children().where(node => node.Name === name);
  }

  public NextsFromSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromSelf()
    : super.NextsFromSelf().where(node => node.Name === name);
  }

  // public IEnumerable<TNode> NextsFromSelfAndSelf(string name) {
  //     return NextsFromSelfAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> NextsFromLast(string name) {
  //     return NextsFromLast().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> NextsFromLastAndSelf(string name) {
  //     return NextsFromLastAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> PrevsFromFirst(string name) {
  //     return PrevsFromFirst().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> PrevsFromFirstAndSelf(string name) {
  //     return PrevsFromFirstAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> PrevsFromSelf(string name) {
  //     return PrevsFromSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> PrevsFromSelfAndSelf(string name) {
  //     return PrevsFromSelfAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> Descendants(string name) {
  //     return Descendants().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsAndSelf(string name) {
  //     return DescendantsAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> Siblings(string name) {
  //     return Siblings().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> SiblingsAndSelf(string name) {
  //     return SiblingsAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsAfterSelf(string name) {
  //     return AncestorsAndSiblingsAfterSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsAfterSelfAndSelf(string name) {
  //     return AncestorsAndSiblingsAfterSelfAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsBeforeSelf(string name) {
  //     return AncestorsAndSiblingsBeforeSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsBeforeSelfAndSelf(string name) {
  //     return AncestorsAndSiblingsBeforeSelfAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsWithSingleChild(string name) {
  //     return AncestorsWithSingleChild().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsWithSingleChildAndSelf(string name) {
  //     return AncestorsWithSingleChildAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsOfSingle(string name) {
  //     return DescendantsOfSingle().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsOfSingleAndSelf(string name) {
  //     return DescendantsOfSingleAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsOfFirstChild(string name) {
  //     return DescendantsOfFirstChild().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsOfFirstChildAndSelf(string name) {
  //     return DescendantsOfFirstChildAndSelf().Where(node => node.Name == name);
  // }



  // public IEnumerable<TNode> Descendants(string name, int inclusiveDepth) {
  //     return Descendants(inclusiveDepth).Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> DescendantsAndSelf(string name, int inclusiveDepth) {
  //     return DescendantsAndSelf(inclusiveDepth).Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> Siblings(string name, int inclusiveEachLength) {
  //     return Siblings(inclusiveEachLength).Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> SiblingsAndSelf(string name, int inclusiveEachLength) {
  //     return SiblingsAndSelf(inclusiveEachLength).Where(node => node.Name == name);
  // }
}
