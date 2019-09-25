import * as fs from 'fs';
import * as filepath from 'path';
import * as util from 'util';
import * as vm from 'vm';

import * as ts from 'typescript';
import * as yargs from 'yargs';

import { CalendarDate, Decimal } from '@phensley/cldr';
import { framework } from './helpers';

/**
 * Evaluate Typescript examples embedded inside Markdown.
 */

const TYPESCRIPT_START = '```typescript';
const TYPESCRIPT_END = '```';
const OUTPUT_START = '<pre class="output">';
const OUTPUT_END = '</pre>';

/**
 * Evaluate a Typescript script and return its output as a series of lines.
 */
const evaluate = (source: string): string[] => {
  const lines: any[] = [];
  const sandbox = {
    exports: {},
    require,
    framework,
    log: (...args: any[]) => lines.push(args.map(convert)),
  };

  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
    }
  });

  const script = new vm.Script(js.outputText);
  const context = vm.createContext(sandbox);
  script.runInContext(context);

  const res: string[] = [];

  // hack: check if output was all whitespace before processing
  // individual lines
  const tmp = lines.map(line => line.join('')).join('').trim();

  if (tmp.length) {
    // convert empty lines into non-breaking space
    for (const line of lines) {
      const tmp = line.join(' ');
      res.push(tmp.trim() === '' ? '&nbsp;' : tmp);
    }
  }
  return res;
};

/**
 * Process a Markdown source file looking for embedded Typescript and
 * HTML output blocks. Evaluate the Typescript blocks and replace all
 * output blocks with the new output.
 */
const generate = (raw: string) => {
  const lines = raw.split('\n');
  let inscript = false;
  let inoutput = false;

  let res: string[] = [];
  let script: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (inoutput) {
      if (line.startsWith(OUTPUT_END)) {
        inoutput = false;
      }
      continue;
    } else if (line.startsWith(OUTPUT_START)) {
      inoutput = true;
      continue;
    }

    res.push(line);

    if (inscript) {
      if (line.startsWith(TYPESCRIPT_END)) {
        inscript = false;

        // Evaluate script and emit new output lines
        const out = evaluate(script.join('\n'));
        if (out.length) {
          res.push(OUTPUT_START);
          res = res.concat(out);
          res.push(OUTPUT_END);
        }
      } else {
        script.push(line);
      }
      continue;

    } else if (line.startsWith(TYPESCRIPT_START)) {
      inscript = true;
      script = [];
    }
  }
  return res.join('\n');
};

/**
 * Convert a typed argument to a string.
 */
const convert = (arg: any): string => {
  if (arg instanceof CalendarDate || arg instanceof Decimal) {
    return arg.toString();
  }
  if (typeof arg === 'string') {
    return `${arg}`;
  }
  return util.inspect(arg);
};

const addpath = (dirs: string[], files: string[], path: string) => {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    dirs.push(path);
  } else if (path.endsWith('.md')) {
    files.push(path);
  }
};

const run = (argv: yargs.Arguments) => {
  const dirs: string[] = [];
  const files: string[] = [];

  for (const arg of argv._) {
    addpath(dirs, files, arg);
  }

  // Recursively find all markdown files
  while (dirs.length) {
    const dir = dirs.pop()!;
    const names = fs.readdirSync(dir);
    for (const name of names) {
      addpath(dirs, files, filepath.join(dir, name));
    }
  }

  files.sort().forEach(path => {
    process.stderr.write(`process ${path}\n`);
    const raw = fs.readFileSync(path, { encoding: 'utf-8' }).toString();
    const md = generate(raw);
    if (argv.verbose) {
      console.log(md);
    }
    if (argv.modify) {
      fs.writeFileSync(path, md, { encoding: 'utf-8' });
    }
  });
};

/**
 * Entry point for cldr-compiler command line.
 */
const main = () => {
  const args = yargs
    .option('-m', {
      alias: 'modify',
      description: 'Modify files on disk' })
    .option('v', { alias: 'verbose', description: 'Verbose mode' })
    .help('help')
    .option('h', { alias: 'help' })
    .parse();
  run(args);
};

main();
