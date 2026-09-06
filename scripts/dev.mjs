import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

// Accept the supervised preview's Vite-style flags while retaining Next.js.
// Next treats an explicitly supplied port as strict (no fallback port).
const require = createRequire(import.meta.url);
const args = process.argv.slice(2).flatMap(arg => {
  if (arg === '--strictPort') return [];
  if (arg === '--host') return ['--hostname'];
  if (arg.startsWith('--host=')) return [arg.replace('--host=', '--hostname=')];
  return [arg];
});
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', ...args], { stdio: 'inherit' });
child.on('error', error => { console.error(error.message); process.exit(1); });
child.on('exit', (code, signal) => { process.exit(code ?? (signal === 'SIGINT' || signal === 'SIGTERM' ? 0 : 1)); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { child.kill(signal); });
