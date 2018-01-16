// インターフェイス統合によるコアクラスの拡張
declare interface String {
  /**
   文字列を挿入する
    @param insertIdx 挿入する位置
    @param insertString 挿入する文字列
  */
  insert(insertIdxdx: number, insertString: string): string;

  normalizeNewLine(): string;
}

String.prototype.insert = function (insertIdx: number, insertString: string) {
  return (this.slice(0, insertIdx) + insertString + this.slice(insertIdx));
};

String.prototype.normalizeNewLine = function () {
  return this.replace(/\r?\n/g, '\n');
};
