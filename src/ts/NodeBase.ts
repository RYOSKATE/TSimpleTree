/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */

export class NodeBase<TNode extends NodeBase<TNode, TValue>, TValue> {
  /**
   * Gets the parent node.
   */
  _parent : TNode;

  /**
   * Gets the previous node.
   */
  _cyclicPrev : TNode;

  /**
   * Gets the next node.
   */
  _cyclicNext : TNode;

  /**
   * Gets and sets the value.
   */
  _value : TValue;

  /**
   * Gets the first child node.
   */
  _firstChild : TNode;

  public constructor(value? : any) {
      if(((value != null) || value === null)) {
          const __args = Array.prototype.slice.call(arguments);
          this._parent = null;
          this._cyclicPrev = null;
          this._cyclicNext = null;
          this._value = null;
          this._firstChild = null;
          this._parent = null;
          this._cyclicPrev = null;
          this._cyclicNext = null;
          this._value = null;
          this._firstChild = null;
          (() => {
              this._cyclicPrev = this.thisNode();
              this._cyclicNext = this.thisNode();
              this._value = value;
          })();
      } else if(value === undefined) {
          const __args = Array.prototype.slice.call(arguments);
          this._parent = null;
          this._cyclicPrev = null;
          this._cyclicNext = null;
          this._value = null;
          this._firstChild = null;
          this._parent = null;
          this._cyclicPrev = null;
          this._cyclicNext = null;
          this._value = null;
          this._firstChild = null;
          (() => {
              this._cyclicPrev = this.thisNode();
              this._cyclicNext = this.thisNode();
          })();
      } else throw new Error('invalid overload');
  }

  /**
   * The casted this instance for the simplicity.
   * @return {net.exkazuu.tree.NodeBase}
   */
  thisNode() : TNode {
      return <TNode><any>this;
  }

  /**
   * Gets the parent node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public parent() : TNode {
      return this._parent;
  }

  /**
   * Gets the previous node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public cyclicPrev() : TNode {
      return this._cyclicPrev;
  }

  /**
   * Gets the next node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public cyclicNext() : TNode {
      return this._cyclicNext;
  }

  /**
   * Gets the first child node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public firstChild() : TNode {
      return this._firstChild;
  }

  /**
   * Gets the last child node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public lastChild() : TNode {
      return this._firstChild != null?this._firstChild._cyclicPrev:null;
  }

  /**
   * Gets the previous node or null.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public prev() : TNode {
    return this._cyclicPrev !== this.lastSibling()?this._cyclicPrev:null;
  }

  /**
   * Gets the next node or null.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public next() : TNode {
      return this._cyclicNext !== this.firstSibling()?this._cyclicNext:null;
  }

  /**
   * Gets the first sibling node or the current node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public firstSibling() : TNode {
      return this._parent != null?this._parent._firstChild:this.thisNode();
  }

  /**
   * Gets the last sibling node or the current node.
   * @return {net.exkazuu.tree.NodeBase}
   */
  public lastSibling() : TNode {
      return this._parent != null?this._parent._firstChild._cyclicPrev:this.thisNode();
  }

  public ancestorsAndSelf() : NodeBase.Iterable<TNode> {
      return new NodeBase.NodeBase$0(this);
  }

  public children() : NodeBase.Iterable<TNode> {
      return new NodeBase.NodeBase$1(this);
  }

  public nextsFromSelf() : NodeBase.Iterable<TNode> {
      return new NodeBase.NodeBase$2(this);
  }
  public static getOne() : number {
    return 1;
  }
}
NodeBase["__class"] = "net.exkazuu.tree.NodeBase";


export namespace NodeBase {

  export interface Iterable<E> {
      iterator() : any;
  }

  export class NodeBase$0 implements NodeBase.Iterable<any> {
      public __parent: any;
      /**
       * 
       * @return {*}
       */
      public iterator() : any {
          return new NodeBase$0.NodeBase$0$0(this);
      }

      constructor(__parent: any) {
        this.__parent = __parent;
      }
  }
  NodeBase$0["__interfaces"] = ["net.exkazuu.tree.NodeBase.Iterable"];



  export namespace NodeBase$0 {

      export class NodeBase$0$0 {
        public __parent: any;
        _node : any;

          /**
           * 
           * @return {boolean}
           */
        public hasNext() : boolean {
              return this._node != null;
          }

          /**
           * 
           * @return {net.exkazuu.tree.NodeBase}
           */
        public next() : any {
            if(!this.hasNext()) {
                throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.util.NoSuchElementException','java.lang.Exception'] });
              }
            const previousNode : any = this._node;
          this._node = previousNode._parent;
          return previousNode;
        }

          /**
           * 
           */
        public remove() {
          throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.UnsupportedOperationException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        }

        constructor(__parent: any) {
          this.__parent = __parent;
          this._node = this.__parent.__parent.thisNode();
        }
      }
      NodeBase$0$0['__interfaces'] = ['java.util.Iterator'];


  }


  export class NodeBase$1 implements NodeBase.Iterable<any> {
    public __parent: any;
      /**
       * 
       * @return {*}
       */
    public iterator() : any {
      return new NodeBase$1.NodeBase$1$0(this);
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  NodeBase$1['__interfaces'] = ['net.exkazuu.tree.NodeBase.Iterable'];



  export namespace NodeBase$1 {

      export class NodeBase$1$0 {
        public __parent: any;
        _node : any;

        _hasNext : boolean;

          /**
           * 
           * @return {boolean}
           */
        public hasNext() : boolean {
          return this._hasNext;
        }

          /**
           * 
           * @return {net.exkazuu.tree.NodeBase}
           */
        public next() : any {
          if(!this.hasNext()) {
            throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.util.NoSuchElementException','java.lang.Exception'] });
          }
          const previousNode : any = this._node;
          this._node = previousNode._cyclicNext;
          this._hasNext = this._node !== this.__parent.__parent.firstChild();
          return previousNode;
        }

          /**
           * 
           */
        public remove() {
          throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.UnsupportedOperationException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        }

        constructor(__parent: any) {
          this.__parent = __parent;
          this._node = this.__parent.__parent.firstChild();
          this._hasNext = true;
        }
      }
      NodeBase$1$0['__interfaces'] = ['java.util.Iterator'];


  }


  export class NodeBase$2 implements NodeBase.Iterable<any> {
    public __parent: any;
      /**
       * 
       * @return {*}
       */
    public iterator() : any {
      return new NodeBase$2.NodeBase$2$0(this);
    }

    constructor(__parent: any) {
      this.__parent = __parent;
    }
  }
  NodeBase$2['__interfaces'] = ['net.exkazuu.tree.NodeBase.Iterable'];



  export namespace NodeBase$2 {

      export class NodeBase$2$0 {
        public __parent: any;
        _node : any;

          /**
           * 
           * @return {boolean}
           */
        public hasNext() : boolean {
          return this._node !== this.__parent.__parent.firstSibling();
        }

          /**
           * 
           * @return {net.exkazuu.tree.NodeBase}
           */
        public next() : any {
          if (!this.hasNext()) {
            throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.util.NoSuchElementException','java.lang.Exception'] });
          }
          const previousNode : any = this._node;
          this._node = previousNode._cyclicNext;
          return previousNode;
        }

          /**
           * 
           */
        public remove() {
          throw Object.defineProperty(new Error(), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.UnsupportedOperationException','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        }

        constructor(__parent: any) {
          this.__parent = __parent;
          this._node = this.__parent.__parent.cyclicNext();
        }
      }
      NodeBase$2$0['__interfaces'] = ['java.util.Iterator'];


  }

}
