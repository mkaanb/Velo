const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://emvlutdriambkcrzlnml.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtdmx1dGRyaWFtYmtjcnpsbm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NTI5MTgsImV4cCI6MjA2MjIyODkxOH0.cMsd5JJtDl--3Pt8X8tEz6NEvC_GBVLEGqpuu7c0_3w';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
