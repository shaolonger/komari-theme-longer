import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const extraArgs = process.argv.slice(2);

const command = process.platform === 'win32'
  ? {
      executable: 'powershell.exe',
      args: ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(repoRoot, 'build-theme.ps1'), ...extraArgs],
    }
  : {
      executable: 'bash',
      args: [path.join(repoRoot, 'build-theme.sh'), ...extraArgs],
    };

const result = spawnSync(command.executable, command.args, {
  cwd: repoRoot,
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);