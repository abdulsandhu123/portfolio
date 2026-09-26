const { getDb, checkAdminSecret } = require('../lib/db');

module.exports = async (req, res) => {
  try {
    const db = await getDb();
    const col = db.collection('projects');

    if (req.method === 'GET') {
      const list = await col.find({}).sort({ createdAt: -1 }).toArray();
      res.status(200).json(
        list.map((d) => ({ ...d, id: d._id, _id: undefined }))
      );
      return;
    }

    if (req.method === 'POST') {
      if (!checkAdminSecret(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const body = { ...req.body };
      const id = body.id || ('p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7));
      delete body.id;
      body.createdAt = body.createdAt || Date.now();
      await col.updateOne({ _id: id }, { $set: body }, { upsert: true });
      res.status(200).json({ ok: true, id });
      return;
    }

    if (req.method === 'DELETE') {
      if (!checkAdminSecret(req)) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }
      const id = req.query.id;
      if (!id) {
        res.status(400).json({ error: 'Missing id' });
        return;
      }
      await col.deleteOne({ _id: id });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
};
