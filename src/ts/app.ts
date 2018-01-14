// tslint:disable-next-line:import-name
import Enumerable, { LinqEnumerable } from 'typescript-dotnet-es6/System.Linq/Linq';
class Startup {

  public static *generator():IterableIterator<number> {
    yield 1;
    yield 2;
    yield 3;
  }
  public static main(): number {
    const arr = Startup.generator();
    const enu:LinqEnumerable<number> = Enumerable.fromAny(arr);
    const i = enu.elementAtOrDefault(1);
    console.log(i);
    return 0;
  }
}

Startup.main();

