-- First, connect to the postgres database
\c postgres

-- Drop the target database if it exists
DROP DATABASE IF EXISTS jobs-listing;

-- Create the new database
CREATE DATABASE jobs-listing;
