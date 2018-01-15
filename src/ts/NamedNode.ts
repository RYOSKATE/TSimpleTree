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

  public NextsFromSelfAndSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromSelfAndSelf()
    : super. NextsFromSelfAndSelf().where(node => node.Name === name);
  }

  public NextsFromLast(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromLast()
    : super.NextsFromLast().where(node => node.Name === name);
  }

  public NextsFromLastAndSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.NextsFromLastAndSelf()
    : super.NextsFromLastAndSelf().where(node => node.Name === name);
  }

  public PrevsFromFirst(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromFirst()
    : super.PrevsFromFirst().where(node => node.Name === name);
  }

  public PrevsFromFirstAndSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromFirstAndSelf()
    : super.PrevsFromFirstAndSelf().where(node => node.Name === name);
  }

  public PrevsFromSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromSelf()
    : super.PrevsFromSelf().where(node => node.Name === name);
  }

  public PrevsFromSelfAndSelf(name?:string):IInfiniteEnumerable<TNode> {
    return name === undefined 
    ? super.PrevsFromSelfAndSelf()
    : super.PrevsFromSelfAndSelf().where(node => node.Name === name);
  }

  // public IEnumerable<TNode> Descendants(string name) {
  //     return Descendants().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsAndSelf(string name) {
  //     return DescendantsAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> Siblings(string name) {
  //     return Siblings().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> SiblingsAndSelf(string name) {
  //     return SiblingsAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsAfterSelf(string name) {
  //     return AncestorsAndSiblingsAfterSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsAfterSelfAndSelf(string name) {
  //     return AncestorsAndSiblingsAfterSelfAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsBeforeSelf(string name) {
  //     return AncestorsAndSiblingsBeforeSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsBeforeSelfAndSelf(string name) {
  //     return AncestorsAndSiblingsBeforeSelfAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsWithSingleChild(string name) {
  //     return AncestorsWithSingleChild().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> AncestorsWithSingleChildAndSelf(string name) {
  //     return AncestorsWithSingleChildAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsOfSingle(string name) {
  //     return DescendantsOfSingle().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsOfSingleAndSelf(string name) {
  //     return DescendantsOfSingleAndSelf().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsOfFirstChild(string name) {
  //     return DescendantsOfFirstChild().where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsOfFirstChildAndSelf(string name) {
  //     return DescendantsOfFirstChildAndSelf().where(node => node.Name === name);
  // }



  // public IEnumerable<TNode> Descendants(string name, int inclusiveDepth) {
  //     return Descendants(inclusiveDepth).where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> DescendantsAndSelf(string name, int inclusiveDepth) {
  //     return DescendantsAndSelf(inclusiveDepth).where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> Siblings(string name, int inclusiveEachLength) {
  //     return Siblings(inclusiveEachLength).where(node => node.Name === name);
  // }

  // public IEnumerable<TNode> SiblingsAndSelf(string name, int inclusiveEachLength) {
  //     return SiblingsAndSelf(inclusiveEachLength).where(node => node.Name === name);
  // }
}
