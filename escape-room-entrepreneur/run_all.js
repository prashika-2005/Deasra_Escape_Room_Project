const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('==================================================');
console.log('🚀 Launching Escape Room App (Backend + Frontend)');
console.log('==================================================\n');

const baseDir = __dirname;
let backendDir = path.join(baseDir, 'backend');
let frontendDir = baseDir;

console.log(`[INFO] Backend Directory:  ${backendDir}`);
console.log(`[INFO] Frontend Directory: ${frontendDir}\n`);

console.log('[1/2] Starting Backend API Server (Port 5000)...');
const backendProcess = spawn('node', ['server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

console.log('[2/2] Starting Frontend UI Server (Port 3000)...');
const frontendProcess = spawn('node', ['server.js'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n[INFO] Shutting down application servers...');
  if (backendProcess) backendProcess.kill();
  if (frontendProcess) frontendProcess.kill();
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
