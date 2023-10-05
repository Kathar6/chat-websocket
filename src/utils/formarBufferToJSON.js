/**
 * @param {WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>} message
 */
export default function (message) {
  const buffer = Buffer.from(message);

  return JSON.parse(buffer.toString());
}
