module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { password } = req.body || {};
    if (!process.env.ADMIN_SECRET) {
      res.status(500).json({ error: 'ADMIN_SECRET is not set on the server' });
      return;
    }
    if (password && password === process.env.ADMIN_SECRET) {
      res.status(200).json({ ok: true });
    } else {
      res.status(401).json({ ok: false, error: 'Incorrect password' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};
