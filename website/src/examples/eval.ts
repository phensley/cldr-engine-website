import * as fs from 'fs';
import * as filepath from 'path';
import * as util from 'util';
import * as vm from 'vm';

import * as deasync from 'deasync';
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

interface Sandbox {
  imports: string[],
  lines: string[][];
  complete: boolean;
}

// Execution context for the script
const makeSandbox = (): Sandbox => {
  const lines: string[][] = [];
  const sandbox = {
    imports: [],
    lines,
    complete: false,
    exports: {},
    require,
    framework,
    __dirname,
    wait: () => deasync.loopWhile(() => !sandbox.complete),
    done: () => sandbox.complete = true,
    json: (arg: any) => sandbox.lines.push([JSON.stringify(arg)]),
    log: (...args: any[]) => sandbox.lines.push(args.map(convert)),
    debug: (...args: any[]) => console.log(...args),
  };
  return sandbox;
};

/**
 * Evaluate a Typescript script and return its output as a series of lines.
 */
const evaluate = (source: string, context: vm.Context, sandbox: Sandbox): string[] => {
  // Reset sandbox state
  sandbox.lines = [];
  sandbox.complete = false;

  const { imports } = sandbox;

  // A bit funky, but since we have to use CommonJS module format, we need
  // to prepend all imports to the file in order.

  source = imports.join('\n') + '\n' + source;

  const js = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES5
    }
  });

  const script = new vm.Script(js.outputText);
  script.runInContext(context, { filename: 'example.mjs' });

  const res: string[] = [];

  // hack: check if output was all whitespace before processing
  // individual lines
  const { lines } = sandbox;
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

const getheader = (lines: string[]): any => {
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('---')) {
      if (start !== -1) {
        return lines.slice(start, i).map(l => l.split(':')).reduce((p: any, c: string[]) => {
          const [k, v] = c;
          p[k.trim()] = v.trim();
          return p;
        }, {} as any);
      }
      start = i + 1;
    }
  }
  return {};
};

/**
 * Process a Markdown source file looking for embedded Typescript and
 * HTML output blocks. Evaluate the Typescript blocks and replace all
 * output blocks with the new output.
 */
const generate = (raw: string, context: vm.Context, sandbox: Sandbox) => {
  const lines = raw.split('\n');

  const header = getheader(lines);
  if (header['noeval'] === 'true') {
    return raw;
  }

  let inscript = false;
  let inoutput = false;

  let res: string[] = [];
  let script: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (inoutput) {
      if (line.startsWith(OUTPUT_END)) {
        inoutput = false;
      }
      continue;
    } else if (line.startsWith(OUTPUT_START)) {
      inoutput = true;
      continue;
    }

    if (inscript) {
      if (line.startsWith(TYPESCRIPT_END)) {
        inscript = false;
        res.push(line);

        // Evaluate script and emit new output lines
        const out = evaluate(script.join('\n'), context, sandbox);
        if (out.length) {
          res.push(OUTPUT_START);
          res = res.concat(out);
          res.push(OUTPUT_END);
        }
      } else {
        // Collect imports so we can prepend them to all scripts in the same doc
        if (line.startsWith('import')) {
          let tmp = '';
          while (i < lines.length) {
            tmp += lines[i];
            res.push(lines[i]);
            if (lines[i].trim().endsWith(';')) {
              break;
            }
            i++;
          }
          sandbox.imports.push(tmp);
        } else {
          script.push(line);
          res.push(line);
        }
      }

    } else if (line.startsWith(TYPESCRIPT_START)) {
      inscript = true;
      script = [];
      res.push(line);
    } else {
      res.push(line);
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
    addpath(dirs, files, arg as string);
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
    // Reuse the same context for all script executions on a single page
    // This lets us reuse definitions
    const sandbox = makeSandbox();
    const context = vm.createContext(sandbox);

    process.stderr.write(`process ${path}\n`);
    const raw = fs.readFileSync(path, { encoding: 'utf-8' }).toString();
    const md = generate(raw, context, sandbox);
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
