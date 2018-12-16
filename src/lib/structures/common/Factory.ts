export class Factory<V, C extends new (...args: any[]) => V> extends Map<string, C> {}
