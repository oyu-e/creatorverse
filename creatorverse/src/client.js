import { createClient } from '@supabase/supabase-js';

const URL = 'https://bpysgkoblozjctpabrlz.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJweXNna29ibG96amN0cGFicmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwNDA5MTksImV4cCI6MjA0MDYxNjkxOX0.f6WVZkOQciJxuXBQrjeJ-GS1Eh02yst6aI_Bw-0dAkQ';

export const supabase = createClient(URL, API_KEY);
