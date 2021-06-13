export abstract class Enumeration<IdType extends string | number> {
  public name: string;
  public id: IdType;

  equals(other: object): boolean {
    if (!(other instanceof Enumeration) || !other) {
      return false;
    }

    return other.id === this.id;
  }


}
