// tslint:disable-next-line:import-name
import Enumerable from 'typescript-dotnet-es6/System.Linq/Linq';
import { IInfiniteEnumerable } from 'typescript-dotnet-es6/System.Linq/Enumerable';
import { forEach } from 'typescript-dotnet-es6/System/Collections/Enumeration/Enumerator';
import { StringBuilder } from 'typescript-dotnet-es6/System/Text/StringBuilder';
import { InvalidOperationException } from 'typescript-dotnet-es6//System/Exceptions/InvalidOperationException';
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
    return this.Children().count();
  }

  public get LengthFromDeepestChild():number {
    return this.GetLengthFromDeepestChild();
  }


  private GetLengthFromDeepestChild():number {
    let maxLength = 0;
    this.Children().forEach(child => {
      const length = child.GetLengthFromDeepestChild() + 1;
      if (maxLength < length) {
        maxLength = length;
      }
    });
    return maxLength;
  }

  public ChildAtOrNull(index:number):TNode {
    return this.Children().elementAtOrDefault(index);
  }

  public Ancestors(inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    return inclusiveDepth === undefined 
    ? this.AncestorsAndSelf().skip(1) 
    : this.Ancestors().take(inclusiveDepth);
  }
  
  public AncestorsAndSelf(inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    if (inclusiveDepth !== undefined) {
      return this.AncestorsAndSelf().take(inclusiveDepth + 1);
    }
    function *generator() {
      let node = this.ThisNode;
      do {
        yield node;
        node = node.Parent;
      } while (node != null);
    }
    return Enumerable.fromAny(generator());
  }

  private Children():IInfiniteEnumerable<TNode> {
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }


  public ReverseChildren():IInfiniteEnumerable<TNode> {
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }

  public NextsFromSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.CyclicNext;
      const terminal = this.FirstSibling;
      while (node !== terminal) {
        yield node;
        node = node.CyclicNext;
      }
    }
    return Enumerable.fromAny(generator());
  }

  public NextsFromSelfAndSelf():IInfiniteEnumerable<TNode> {
    return Enumerable.repeat(this.ThisNode, 1).concat(this.NextsFromSelf());
  }

  public NextsFromLast():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.LastSibling;
      const terminal = this.ThisNode;
      while (node !== terminal) {
        yield node;
        node = node.CyclicPrev;
      }
    }
    return Enumerable.fromAny(generator());
  }

  public NextsFromLastAndSelf():IInfiniteEnumerable<TNode> {
    return this.NextsFromLast().concat(Enumerable.repeat(this.ThisNode, 1));
  }

  public PrevsFromFirst():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.FirstSibling;
      const terminal = this.ThisNode;
      while (node !== terminal) {
        yield node;
        node = node.CyclicNext;
      }
    }
    return Enumerable.fromAny(generator());
  }

  public PrevsFromFirstAndSelf():IInfiniteEnumerable<TNode> {
    return this.PrevsFromFirst().concat(Enumerable.repeat(this.ThisNode, 1));
  }

  public PrevsFromSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.CyclicPrev;
      const terminal = this.LastSibling;
      while (node !== terminal) {
        yield node;
        node = node.CyclicPrev;
      }
    }
    return Enumerable.fromAny(generator());
  }

  public PrevsFromSelfAndSelf():IInfiniteEnumerable<TNode> {
    return Enumerable.repeat(this.ThisNode, 1).concat(this.PrevsFromSelf());
  }

  public Descendants(inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }

  public DescendantsAndSelf(inclusiveDepth?:number):IInfiniteEnumerable<TNode> {
    return inclusiveDepth === undefined
      ? Enumerable.repeat(this.ThisNode, 1).concat(this.Descendants())
      : Enumerable.repeat(this.ThisNode, 1).concat(this.Descendants(inclusiveDepth));
  }

  public Siblings(inclusiveEachLength?:number):IInfiniteEnumerable<TNode> {
    if (inclusiveEachLength !== undefined) {
      return this.PrevsFromSelf().take(inclusiveEachLength).reverse()
      .concat(this.NextsFromSelf().take(inclusiveEachLength));
    }
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }

  public SiblingsAndSelf(inclusiveEachLength?:number):IInfiniteEnumerable<TNode> {
    if (inclusiveEachLength !== undefined) {
      return this.PrevsFromSelf().take(inclusiveEachLength).reverse()
                .concat(Enumerable.repeat(this.ThisNode, 1))
                .concat(this.NextsFromSelf().take(inclusiveEachLength));
    }
    function *generator() {
      const first = this.FirstSibling;
      let node = first;
      do {
        yield node;
        node = node.CyclicNext;
      } while (node !== first);
    }
    return Enumerable.fromAny(generator());
  }

  public AncestorsAndSiblingsAfterSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.ThisNode;
      do {
        for (const e of node.NextsFromSelf()) {
          yield e;
        }
        node = node.Parent;
      } while (node != null);
    }
    return Enumerable.fromAny(generator());
  }
  
  public AncestorsAndSiblingsAfterSelfAndSelf():IInfiniteEnumerable<TNode> {
    return Enumerable.repeat(this.ThisNode, 1).concat(this.AncestorsAndSiblingsAfterSelf());
  }

  public AncestorsAndSiblingsBeforeSelf():IInfiniteEnumerable<TNode> {
    return this.AncestorsAndSiblingsBeforeSelfAndSelf().skip(1);
  }

  public AncestorsAndSiblingsBeforeSelfAndSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.ThisNode;
      do {
        for (const e of node.PrevsFromSelfAndSelf()) {
          yield e;
        }
        node = node.Parent;
      } while (node != null);
    }
    return Enumerable.fromAny(generator());
  }

  public AncestorWithSingleChild():IInfiniteEnumerable<TNode> {
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }

  public AncestorsWithSingleChild():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.ThisNode;
      while (node === node.CyclicNext) {
        node = node.Parent;
        if (node == null) {
          break;
        }
        yield node;
      }
    }
    return Enumerable.fromAny(generator());
  }

  public AncestorsWithSingleChildAndSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
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
    return Enumerable.fromAny(generator());
  }

  public DescendantsOfSingle():IInfiniteEnumerable<TNode> {
    return this.DescendantsOfSingleAndSelf().skip(1);
  }

  public DescendantsOfSingleAndSelf():IInfiniteEnumerable<TNode> {
    function *generator() {
      let node = this.ThisNode;
      do {
        yield node;
        node = node.FirstChild;
      } while (node != null && node === node.CyclicNext);
    }
    return Enumerable.fromAny(generator());
  }

  public DescendantsOfFirstChild():IInfiniteEnumerable<TNode> {
    return this.DescendantsOfFirstChildAndSelf().skip(1);
  }

  public DescendantsOfFirstChildAndSelf() {
    function *generator() {
      let node = this.ThisNode;
      do {
        yield node;
        node = node.FirstChild;
      } while (node != null);
    }
    return Enumerable.fromAny(generator());
  }

  public AddPrevious(node:TNode):TNode {
    console.assert(node != null);
    console.assert(node.Parent == null);
    console.assert(this.Parent != null);
    if (this.Parent.FirstChild === <TNode><any>this) {
      this.Parent.firstChild = node;
    }
    return this.AddPreviousIgnoringFirstChild(node);
  }

  public addNext(node:TNode):TNode {
    console.assert(node != null);
    console.assert(node.Parent == null);
    console.assert(this.Parent != null);
    return this.CyclicNext.AddPreviousIgnoringFirstChild(node);
  }

  public AddFirst(node:TNode):TNode {
    console.assert(node != null);
    console.assert(node.Parent == null);
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
    console.assert(node != null);
    console.assert(node.Parent == null);
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
      throw new InvalidOperationException('A root node cannot be replaced.');
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
      throw new InvalidOperationException('A root node cannot be removed.');
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
      throw new InvalidOperationException('A root node cannot be removed.');
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
    node.Children().forEach(child => {
      this.ToStringPrivate(child, depth + 1, builder);
    });
  }
}
