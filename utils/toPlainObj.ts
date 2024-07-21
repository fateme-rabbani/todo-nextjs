export default function toPlainObj<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T;
}
