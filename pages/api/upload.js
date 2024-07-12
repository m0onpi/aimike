// pages/api/upload.js
import formidable from 'formidable';
import { Storage } from '@google-cloud/storage';
import speech from '@google-cloud/speech';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const getGCPCredentials = () => {
  // for Vercel, use environment variables
  return process.env.GCP_PRIVATE_KEY
    ? {
        credentials: {
          client_email: process.env.GCP_SERVICE_ACCOUNT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY,
        },
        projectId: process.env.GCP_PROJECT_ID,
      }
      // for local development, use gcloud CLI
    : {};
};

const uploadFile = async () => {
  const storageClient = new Storage(getGCPCredentials());
  const bucketName = 'aimike-bucket';
  const fileName = 'my-file.json';
  const file = storageClient.bucket(bucketName).file(fileName);
  
  await file.save(JSON.stringify({
    foo: 'bar',
  }), {
    contentType: 'application/json',
  });
};

const transcribeAudio = async (gcsUri) => {
  const client = new speech.SpeechClient();

  const audio = {
    uri: gcsUri,
  };

  const config = {
    encoding: 'MP3',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('\n');

  return transcription;
};

export default async (req, res) => {
  const form = formidable({
    uploadDir: path.join(process.cwd(), '/uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const file = files.file;
    try {
      const gcsUri = await uploadFile(file);
      const transcription = await transcribeAudio(gcsUri);
      res.status(200).json({ transcription });
    } catch (error) {
      res.status(500).json({ error: 'Transcription failed', details: error.message });
    }
  });
};
