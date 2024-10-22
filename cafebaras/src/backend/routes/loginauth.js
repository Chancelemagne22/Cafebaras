import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import supabase from '../supabaseHandler.js';

const router = express.Router();


router.post