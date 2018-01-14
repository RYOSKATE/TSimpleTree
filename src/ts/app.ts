// tslint:disable-next-line:import-name
import Enumerable, { LinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Linq';
import { NamedNode } from './NamedNode';
class Startup {

  public static *generator():IterableIterator<number> {
    yield 10;
    yield 20;
    yield 30;
  }
  public static main(): number {
    const arr = Startup.generator();
    const enu:LinqEnumerable<number> = Enumerable.fromAny(arr);
    let v:number = 100;
    enu.forEach(x => {
      ++v;
      console.log(x + v);
    });
   
    return 0;
  }
}

Startup.main();

