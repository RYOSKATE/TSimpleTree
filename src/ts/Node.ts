// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-umd/System.Linq/Linq';
import { StringBuilder } from 'typescript-dotnet-umd/System/Text/StringBuilder';


export class Node<TNode extends Node<TNode, TValue>, TValue> {
  
  /// Initializes a new instance of the Node class with a default value.
  protected constructor(value?: TValue) {
    this.cyclicPrev = this.ThisNode;
    this.cyclicNext = this.ThisNode;
    this.value = value;
  }

  private get ThisNode(): TNode {
    return <TNode><any>this;
  }
  public get FirstSibling():TNode {
    return this.Parent != null ? this.Parent.FirstChild : this.ThisNode;
  }
  public get LastSibling(): TNode {
    return this.Parent != null ? this.Parent.FirstChild.CyclicPrev : this.ThisNode;
  }

  private _firstChild:TNode;
  public get FirstChild():TNode {
    return this._firstChild;
  }
  private set firstChild(firstChild:TNode) {
    this._firstChild = firstChild;
  }

  public get LastChild():TNode {
    return this.FirstChild != null ? this.FirstChild.CyclicPrev : null;
  }

  private _parent:TNode;
  public get Parent():TNode {
    return this._parent;
  }
  private set parent(parent:TNode) {
    this._parent = parent;
  }

  private _cyclicPrev:TNode;
  public get CyclicPrev():TNode {
    return this._firstChild;
  }
  private set cyclicPrev(cyclicPrev:TNode) {
    this._cyclicPrev = cyclicPrev;
  }

  private _cyclicNext:TNode;
  public get CyclicNext():TNode {
    return this._cyclicNext;
  }
  private set cyclicNext(cyclicNext:TNode) {
    this._cyclicNext = cyclicNext;
  }
  public get Prev():TNode {
    return this.CyclicPrev !== this.LastSibling ? this.CyclicPrev : null;
  }
  public get Next():TNode {
    return this.CyclicNext !== this.FirstSibling ? this.CyclicNext : null;
  }

  private _value:TValue;
  protected get Value():TValue {
    return this._value;
  }
  protected set value(value: TValue) {
    this._value = value;
  }

  public get ChildrenCount():number {
    return Enumerable.fromAny(this.Children()).count();
  }

  public get LengthFromDeepestChild():number {
    return this.GetLengthFromDeepestChild();
  }


  private GetLengthFromDeepestChild():number {
    let maxLength = 0;
    for (const child of this.Children()) {
      const length = child.GetLengthFromDeepestChild() + 1;
      if (maxLength < length) {
        maxLength = length;
      }
    }
    return maxLength;
  }

  public ChildAtOrNull(index:number):TNode {
    let i = 0;
    for (const node of this.Children()) {
      if (i++ === index) {
        return node;
      }
    }
    return null;
  }

  public Ancestors():IterableIterator<TNode> {
    const iterator = this.AncestorsAndSelf();
    iterator.next();
    return iterator;
  }
  
  public *AncestorsAndSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    do {
      yield node;
      node = node.Parent;
    } while (node != null);
  }
  
  private *Children():IterableIterator<TNode> {
    let node = this.FirstChild;
    if (node == null) {
      return;
    }
    const terminal = node;
    do {
      yield node;
      node = node.CyclicNext;
    } while (node !== terminal);
  }

  public *ReverseChildren():IterableIterator<TNode> {
    let node = this.LastChild;
    if (node == null) {
      return;
    }
    const terminal = node;
    do {
      yield node;
      node = node.CyclicPrev;
    } while (node !== terminal);
  }

  public *NextsFromSelf():IterableIterator<TNode> {
    let node = this.CyclicNext;
    const terminal = this.FirstSibling;
    while (node !== terminal) {
      yield node;
      node = node.CyclicNext;
    }
  }
  // public NextsFromSelfAndSelf():IterableIterator<TNode> {
  //   return Enumerable.Repeat(ThisNode, 1).Concat(NextsFromSelf());
  // }

  public *NextsFromLast():IterableIterator<TNode> {
    let node = this.LastSibling;
    const terminal = this.ThisNode;
    while (node !== terminal) {
      yield node;
      node = node.CyclicPrev;
    }
  }

  // public IEnumerable<TNode> NextsFromLastAndSelf() {
  //   return NextsFromLast().Concat(Enumerable.Repeat(ThisNode, 1));
  // }
  public *PrevsFromFirst():IterableIterator<TNode> {
    let node = this.FirstSibling;
    const terminal = this.ThisNode;
    while (node !== terminal) {
      yield node;
      node = node.CyclicNext;
    }
  }
  // public IEnumerable<TNode> PrevsFromFirstAndSelf() {
  //   return PrevsFromFirst().Concat(Enumerable.Repeat(ThisNode, 1));
  // }

  public *PrevsFromSelf():IterableIterator<TNode> {
    let node = this.CyclicPrev;
    const terminal = this.LastSibling;
    while (node !== terminal) {
      yield node;
      node = node.CyclicPrev;
    }
  }

  // public IEnumerable<TNode> PrevsFromSelfAndSelf() {
  //   return Enumerable.Repeat(ThisNode, 1).Concat(PrevsFromSelf());
  // }

  // public IEnumerable<TNode> DescendantsAndSelf() {
  //     return Enumerable.Repeat(ThisNode, 1).Concat(Descendants());
  // }
  public *Siblings():IterableIterator<TNode> {
    const first = this.FirstSibling;
    let node = first;
    while (node !== <TNode><any>this) {
      yield node;
      node = node.CyclicNext;
    }
    node = node.CyclicNext;
    while (node !== first) {
      yield node;
      node = node.CyclicNext;
    }
  }

  public *SiblingsAndSelf():IterableIterator<TNode> {
    const first = this.FirstSibling;
    let node = first;
    do {
      yield node;
      node = node.CyclicNext;
    } while (node !== first);
  }

  public *AncestorsAndSiblingsAfterSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    do {
      for (const e of node.NextsFromSelf()) {
        yield e;
      }
      node = node.Parent;
    } while (node != null);
  }
  
  // public IEnumerable<TNode> AncestorsAndSiblingsAfterSelfAndSelf() {
  //   return Enumerable.Repeat(ThisNode, 1).Concat(AncestorsAndSiblingsAfterSelf());
  // }

  // public IEnumerable<TNode> AncestorsAndSiblingsBeforeSelf() {
  //     return AncestorsAndSiblingsBeforeSelfAndSelf().Skip(1);
  // }

  public *AncestorsAndSiblingsBeforeSelfAndSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    do {
      for (const e of node.PrevsFromSelfAndSelf()) {
        yield e;
      }
      node = node.Parent;
    } while (node != null);
  }

  public *AncestorWithSingleChild():IterableIterator<TNode> {
    let node = this.ThisNode;
    while (node === node.CyclicNext) {
      const lastNode = node;
      node = node.Parent;
      if (node == null) {
        return lastNode;
      }
    }
    return node;
  }

  public *AncestorsWithSingleChild():IterableIterator<TNode> {
    let node = this.ThisNode;
    while (node === node.CyclicNext) {
      node = node.Parent;
      if (node == null) {
        break;
      }
      yield node;
    }
  }

  public *AncestorsWithSingleChildAndSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    yield node;
    while (node === node.CyclicNext) {
      node = node.Parent;
      if (node == null) {
        break;
      }
      yield node;
    }
  }

  // public IEnumerable<TNode> DescendantsOfSingle() {
  //   return DescendantsOfSingleAndSelf().Skip(1);
  // }

  public *DescendantsOfSingleAndSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    do {
      yield node;
      node = node.FirstChild;
    } while (node != null && node === node.CyclicNext);
  }

  // public IEnumerable<TNode> DescendantsOfFirstChild() {
  //   return DescendantsOfFirstChildAndSelf().Skip(1);
  // }
  public *DescendantsOfFirstChildAndSelf():IterableIterator<TNode> {
    let node = this.ThisNode;
    do {
      yield node;
      node = node.FirstChild;
    } while (node != null);
  }

  // public IEnumerable<TNode> Ancestors(int inclusiveDepth) {
  //   return Ancestors().Take(inclusiveDepth);
  // }

  // public IEnumerable<TNode> AncestorsAndSelf(int inclusiveDepth) {
  //   return AncestorsAndSelf().Take(inclusiveDepth + 1);
  // }
  public *Descendants(inclusiveDepth?:number):IterableIterator<TNode> {
    if (inclusiveDepth === undefined) {
      const start = this.ThisNode;
      let cursor = start;
      if (cursor.FirstChild != null) {
        cursor = cursor.FirstChild;
        yield cursor;
        while (true) {
          while (cursor.FirstChild != null) {
            cursor = cursor.FirstChild;
            yield cursor;
          }
          while (cursor.Next == null) {
            cursor = cursor.Parent;
            if (cursor = start) {
              return;
            }
          }
          cursor = cursor.CyclicNext;
          yield cursor;
        }
      }  
    } else {
      const start = this.ThisNode;
      let cursor = start;
      if (cursor.FirstChild != null && inclusiveDepth > 0) {
        cursor = cursor.FirstChild;
        inclusiveDepth--;
        yield cursor;
        while (true) {
          while (cursor.FirstChild != null && inclusiveDepth > 0) {
            cursor = cursor.FirstChild;
            inclusiveDepth--;
            yield cursor;
          }
          while (cursor.Next == null) {
            cursor = cursor.Parent;
            inclusiveDepth++;
            if (cursor === start) {
              return;
            }
          }
          cursor = cursor.CyclicNext;
          yield cursor;
        }
      }
    }
  }
  // public IEnumerable<TNode> DescendantsAndSelf(int inclusiveDepth) {
  //   return Enumerable.Repeat(ThisNode, 1).Concat(Descendants(inclusiveDepth));
  // }

  // public IEnumerable<TNode> Siblings(int inclusiveEachLength) {
  //   return PrevsFromSelf().Take(inclusiveEachLength).Reverse()
  //           .Concat(NextsFromSelf().Take(inclusiveEachLength));
  // }

  // public IEnumerable<TNode> SiblingsAndSelf(int inclusiveEachLength) {
  //   return PrevsFromSelf().Take(inclusiveEachLength).Reverse()
  //             .Concat(Enumerable.Repeat(ThisNode, 1))
  //             .Concat(NextsFromSelf().Take(inclusiveEachLength));
  // }

  public AddPrevious(node:TNode):TNode {
    // Contract.Requires(node != null);
    // Contract.Requires(node.Parent == null);
    // Contract.Requires(Parent != null);
    if (this.Parent.FirstChild === <TNode><any>this) {
      this.Parent.firstChild = node;
    }
    return this.AddPreviousIgnoringFirstChild(node);
  }

  public addNext(node:TNode):TNode {
    // Contract.Requires(node != null);
    // Contract.Requires(node.Parent == null);
    // Contract.Requires(Parent != null);
    return this.CyclicNext.AddPreviousIgnoringFirstChild(node);
  }

  public AddFirst(node:TNode):TNode {
    // Contract.Requires(node != null);
    // Contract.Requires(node.Parent == null);
    return this.AddFirstPrivate(node);
  }

  private AddFirstPrivate(node:TNode):TNode {
    this.AddLastPrivate(node);
    this.firstChild = node;
    return node;
  }
  private AddPreviousIgnoringFirstChild(node:TNode):TNode {
    node.parent = this.Parent;
    node.cyclicNext = this.ThisNode;
    node.cyclicPrev = this.CyclicPrev;
    this.CyclicPrev.cyclicNext = node;
    this.cyclicPrev = node;
    return node;
  }
  public AddLast(node:TNode):TNode {
    // Contract.Requires(node != null);
    // Contract.Requires(node.Parent == null);
    return this.AddLastPrivate(node);
  }

  private AddLastPrivate(node:TNode):TNode {
    const second = this.FirstChild;
    if (second == null) {
      node.parent = this.ThisNode;
      node.cyclicNext = node;
      node.cyclicPrev = node;
      this.firstChild = node;
    } else {
      second.AddPreviousIgnoringFirstChild(node);
    }
    return node;
  }

  public Replace(newNode:TNode):void {
    if (this.Parent == null) {
      throw new Error('A root node cannot be replaced.');
    }
    newNode.parent = this.Parent;
    newNode.cyclicNext = this.CyclicNext;
    newNode.cyclicPrev = this.CyclicPrev;
    this.CyclicPrev.cyclicNext = newNode; // prev.next = newNode
    this.CyclicNext.cyclicPrev = newNode;
    newNode.CyclicPrev.cyclicNext = newNode;
    if (this.Parent.FirstChild === <TNode><any>this) {
      this.Parent.firstChild = newNode;
    }
    this.cyclicNext = null;
    this.cyclicPrev = null;
    this.parent = null;
  }

  public Remove():void {
    if (this.Parent == null) {
      throw new Error('A root node cannot be removed.');
    }
    const next = this.CyclicNext;
    if (next !== <TNode><any>this) {
      this.CyclicPrev.cyclicNext = next;
      next.cyclicPrev = this.CyclicPrev;
      if (this.Parent.FirstChild === <TNode><any>this) {
        this.Parent.firstChild = next;
      }
    } else {
      this.Parent.firstChild = null;
    }
    this.cyclicNext = null;
    this.cyclicPrev = null;
    this.parent = null;
  }
  public RemoveRecoverably() {
    if (this.Parent == null) {
      throw new Error('A root node cannot be removed.');
    }
    const next = this.CyclicNext;
    if (next !== <TNode><any>this) {
      this.CyclicPrev.cyclicNext = next;
      next.cyclicPrev = this.CyclicPrev;
      if (this.Parent.FirstChild === <TNode><any>this) {
        this.Parent.firstChild = next;
        return () => {
          next.Parent.firstChild = this.ThisNode;
          this.CyclicPrev.cyclicNext = this.ThisNode;
          next.cyclicPrev = this.ThisNode;
        };
      }
      return () => {
        this.CyclicPrev.cyclicNext = this.ThisNode;
        next.cyclicPrev = this.ThisNode;
      };
    }
    const parent = this.Parent;
    parent.firstChild = null;
    return () => { parent.firstChild = this.ThisNode; };
  }

  public toString():string {
    const builder = new StringBuilder();
    this.ToStringPrivate(this.ThisNode, 0, builder);
    return builder.toString();
  }

  private ToStringPrivate(node:TNode,depth:number, builder:StringBuilder):void  {
    if (node == null) {
      return;
    }
    for (let i = 0; i < depth; i++) {
      builder.append('  ');
    }
    builder.appendLine(!node.Value != null ? node.Value.toString() : '');
    for (const child of node.Children()) {
      this.ToStringPrivate(child, depth + 1, builder);
    }
  }
}
