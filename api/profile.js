const { getDb, checkAdminSecret } = require('../lib/db');

module.exports = async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection('profile');

    if (req.method === 'GET') {
      const doc = await col.findOne({ _id: 'main' });
      res.status(200).json(doc || {});
      return;
    }

    if (req.method === 'POST') {
      if (!checkAdminSecret(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const data = { ...req.body };
      delete data._id;
      await col.updateOne({ _id: 'main' }, { $set: data }, { upsert: true });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};
