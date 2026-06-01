-- Add thumbnail video fields to projects table
-- Run this once in the Supabase Dashboard → SQL Editor

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS thumbnail_video_url text,
  ADD COLUMN IF NOT EXISTS thumbnail_video_play text DEFAULT 'auto';
