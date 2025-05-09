const { validateFields, supabase, dayjs, getUserId } = require('../helpers/common');
const express = require('express');
const router = express.Router();

const TABLE_NAME = 'SuppItems';
const CREATE_MESSAGE = ' - Sipariş tedarikçi kalemi başarıyla yaratıldı!';
const KEY_FIELD = 'id';
const KEY_FIELD2 = 'item_id';
const KEY_FIELD3 = 'supp_item_id';
const SEARCH_FIELDS = [ 'id', 'product', 'supplier', 'notes' ];

// GET → Listeleme
router.get('/', async (req, res) => {
    
    const query = buildSupabaseQuery(supabase, TABLE_NAME, req.query, SEARCH_FIELDS);
    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
});



// POST → Veri Ekleme
router.post('/', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const newData = req.body;

// Data Manipulation
    // GETUSER     newData.changed_by = userId; 
    // GETUSER     newData.created_by = userId; 

// Data Manipulation

    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(newData);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(newData[KEY_FIELD] + CREATE_MESSAGE); // Eklenen veriyi geri döner
});

// PUT → Veri Güncelleme
router.put('/:id/:id2/:id3', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const keyID = req.params.id;
    const keyID2 = req.params.id2;
    const keyID3 = req.params.id3;
    const updatedData = req.body;

// Data Manipulation


// Data Manipulation

    const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedData)
    .eq(KEY_FIELD, keyID)
    .eq(KEY_FIELD2, keyID2)
    .eq(KEY_FIELD3, keyID3);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).json(keyID)
});

// DELETE → Veri Silme
router.delete('/:id/:id2/:id3', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const keyID = req.params.id;
    const keyID2 = req.params.id2;
    const keyID3 = req.params.id3;
    const response = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq(KEY_FIELD, keyID)
    .eq(KEY_FIELD2, keyID2)
    .eq(KEY_FIELD3, keyID3)
    res.status(204).send();
});

module.exports = router;
