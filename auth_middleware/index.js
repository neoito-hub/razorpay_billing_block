const handler = async (event) => {
  const { req } = event
  const { user } = req.headers
  req.user = { id: user }
  return true
}

export default handler
