export default async function withUser(cb: Function) {
  const body = await req.json();

  let { neuronId, format, form } = body.data;

  let d1 = Date.now();

  let user = await User.findByToken(body._token);
  return cb({});
}
