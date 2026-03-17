
-- Enable Row Level Security
-- (We will set up specific policies later for public reading and admin writing)

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY, -- Slug used as ID
  label TEXT NOT NULL,
  image TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  dimensions TEXT,
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  collection_id TEXT REFERENCES collections(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY, -- Slug used as ID
  label TEXT NOT NULL,
  description TEXT NOT NULL,
  href TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Collaborators table
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  profession TEXT NOT NULL, -- 'Architecte' | 'Designer d\'Intérieur'
  city TEXT,
  description TEXT NOT NULL,
  collaboration_story TEXT,
  image TEXT NOT NULL,
  hero_image TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  expertise JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb, -- Array of { title, image }
  featured_project JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (Public Read Access)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON collections FOR SELECT USING (true);
CREATE POLICY "Public Read Collaborators" ON collaborators FOR SELECT USING (true);

-- Admin Write Policies (Requires admin role or specific user ID)
-- For now, we allow authenticated users to write (we can tighten this later to a specific 'admin' role)
CREATE POLICY "Admin All Categories" ON categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Collections" ON collections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin All Collaborators" ON collaborators FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Pages Content
CREATE TABLE IF NOT EXISTS pages_content (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  description TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON pages_content
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to manage content" ON pages_content
  FOR ALL USING (auth.role() = 'authenticated');
