import { NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

interface RequestBody {
  query: string;
  file?: string;
  userCode?: string;
}

const allowedFiles = ["example1.pl", "mineral_water.pl", "another_file.pl"];

export async function POST(request: Request): Promise<Response> {
  const { query, file, userCode } = (await request.json()) as RequestBody;

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "No file specified" }, { status: 400 });
  }

  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: "File not allowed" }, { status: 400 });
  }

  const basePrologFile = path.resolve("prolog_files", file);

  // Helper function to run Prolog with a list of consulted files
  const runProlog = (consultFiles: string[]) => {
    const hasVars = /[A-Z]/.test(query);

    let prologGoal = "";
    if (hasVars) {
      const argsMatch = query.match(/\((.*)\)/);
      const args = argsMatch ? argsMatch[1] : "";
      prologGoal = `findall([${args}], (${query}), L), writeq(L), nl, halt`;
    } else {
      prologGoal = `${query}, write('true'), nl, halt`;
    }

    // Build consult calls for all files
    const consults = consultFiles
      .map((f) => `consult('${f}').`)
      .join("");

    // Full goal to consult files and then run the query
    const fullGoal = `${consults} ${prologGoal}`;

    return new Promise<Response>((resolve) => {
      execFile("swipl", ["-q", "-g", fullGoal], (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: stderr || error.message || "Unknown error" },
              { status: 500 }
            )
          );
        } else {
          resolve(NextResponse.json({ result: stdout.trim() || "false" }));
        }
      });
    });
  };

  if (userCode && userCode.trim()) {
    // Write userCode to temp file
    const tmpFilePath = path.join(os.tmpdir(), `user_code_${Date.now()}.pl`);
    fs.writeFileSync(tmpFilePath, userCode, "utf8");

    try {
      const response = await runProlog([basePrologFile, tmpFilePath]);
      fs.unlinkSync(tmpFilePath);
      return response;
    } catch (err) {
      fs.unlinkSync(tmpFilePath);
      return NextResponse.json(
        { error: String(err) || "Unknown error" },
        { status: 500 }
      );
    }
  } else {
    // Just run with base file
    return runProlog([basePrologFile]);
  }
}
