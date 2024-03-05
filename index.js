const handler = async (event) => {
  const { req } = event
  // req.user = { id: 'zCSAYU_t2_aJYqEADBZtC' } // admin
  req.user = { id: 'zCSAYU_t2_aJYqEADBZtD' } // user

  return true
}

export default handler