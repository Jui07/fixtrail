import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Starting FixTrail Full-Stack Platform...');

// Spawn backend server
const serverProcess = spawn('node', ['src/server.js'], {
  cwd: path.join(rootDir, 'server'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

// Spawn frontend client
const clientProcess = spawn('npm.cmd', ['run', 'dev'], {
  cwd: path.join(rootDir, 'client'),
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

const cleanup = () => {
  console.log('\n🛑 Shutting down FixTrail services...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
