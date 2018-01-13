import { NodeBase } from './NodeBase';

class Startup {
  public static main(): number {
    console.log(NodeBase.getOne());
    return 0;
  }
}

Startup.main();
