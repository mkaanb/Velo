const { router, validateFields, supabase, dayjs, getUserId } = require('../helpers/common');
const TABLE_NAME = 'Products';
const CREATE_MESSAGE = ' Kodlu ürün başarıyla yaratıldı!';
const KEY_FIELD = 'id';


// GET → Listeleme
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});


// POST → Ürün Ekleme
router.post('/', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const newData = req.body;

// Data Manipulation
    // GETUSER     newData.changed_by = userId; 
    // GETUSER     newData.created_by = userId; 
    newData.is_active = true;
    newData.created_at = new Date().toISOString();
// Data Manipulation

    const { data, error } = await supabase
        .from(TABLE_NAME)
        .insert(newData);
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(newData[KEY_FIELD] + CREATE_MESSAGE); // Eklenen ürünü geri döner
});

// PUT → Ürün Güncelleme
router.put('/:id', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const keyID = req.params.id;
    const updatedData = req.body;

// Data Manipulation
    updatedData.changed_by = userId; 
    updatedData.changed_at = dayjs().format();
// Data Manipulation

    const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updatedData)
    .eq(KEY_FIELD, keyID);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).json(keyID)
});

// DELETE → Ürün Silme
router.delete('/:id', async (req, res) => {
    // GETUSER const userId = await getUserId(req);
    const keyID = req.params.id;
    const response = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq(KEY_FIELD, keyID)
    res.status(204).send();
});

module.exports = router;
