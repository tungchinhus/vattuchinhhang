import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const PROJECT_ID = process.env.GCLOUD_PROJECT_ID as string;
const API_KEY = process.env.RECAPTCHA_API_KEY as string;
const SITE_KEY = process.env.RECAPTCHA_SITE_KEY as string;

router.post('/api/recaptcha/verify', async (req, res) => {
  try {
    const { token, action } = req.body as { token: string; action?: string };
    if (!PROJECT_ID || !API_KEY || !SITE_KEY) {
      console.error('Missing reCAPTCHA env vars');
      return res.json({ success: false });
    }
    if (!token) {
      return res.json({ success: false });
    }

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${PROJECT_ID}/assessments?key=${API_KEY}`;
    const body = {
      event: {
        token,
        siteKey: SITE_KEY,
        expectedAction: action || 'login'
      }
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await r.json();

    const valid = data?.tokenProperties?.valid === true &&
      data?.tokenProperties?.action === (action || 'login');

    return res.json({ success: !!valid });
  } catch (e) {
    console.error('reCAPTCHA enterprise verify error', e);
    return res.json({ success: false });
  }
});

export default router;


