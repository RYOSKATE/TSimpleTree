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

  // public TNode Child(string name) {
  //     return Children().FirstOrDefault(node => node.Name == name);
  // }

  // public IEnumerable<TNode> Ancestors(string name) {
  //     return Ancestors().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSelf(string name) {
  //     return AncestorsAndSelf().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> Children(string name) {
  //     return Children().Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> NextsFromSelf(string name) {
  //     return NextsFromSelf().Where(node => node.Name == name);
  // }

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

  // public IEnumerable<TNode> Ancestors(string name, int inclusiveDepth) {
  //     return Ancestors(inclusiveDepth).Where(node => node.Name == name);
  // }

  // public IEnumerable<TNode> AncestorsAndSelf(string name, int inclusiveDepth) {
  //     return AncestorsAndSelf(inclusiveDepth).Where(node => node.Name == name);
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