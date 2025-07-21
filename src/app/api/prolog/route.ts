import { NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "No query provided" }, { status: 400 });
  }

  // Път към Prolog файла с факти и правила (променете на вашия файл)
  const prologFile = path.resolve("prolog_files/example1.pl");

  // Проверяваме дали има променливи в заявката (с главна буква)
  const hasVars = /[A-Z]/.test(query);

  // Ако има променливи - използваме findall, за да върнем всички решения
  // Пример: findall([X,Z], grandparent(X,Z), L), writeq(L), nl, halt.
  // Ако няма променливи - само изпълняваме заявката и връщаме true/false
  let prologGoal = "";

  if (hasVars) {
    // Изваждаме аргументите от заявката - това е частта в скобите
    const argsMatch = query.match(/\((.*)\)/);
    const args = argsMatch ? argsMatch[1] : "";

    // Правим findall, който връща списък с всички решения
    prologGoal = `findall([${args}], ${query}, L), writeq(L), nl, halt`;
  } else {
    prologGoal = `${query}, write('true'), nl, halt`;
  }

  return new Promise((resolve) => {
    execFile(
      "swipl",
      ["-q", "-s", prologFile, "-g", prologGoal],
      (error, stdout, stderr) => {
        if (error) {
          resolve(
            NextResponse.json(
              { error: stderr || error.message || "Unknown error" },
              { status: 500 }
            )
          );
        } else {
          // Премахваме новия ред и връщаме резултата
          resolve(NextResponse.json({ result: stdout.trim() || "false" }));
        }
      }
    );
  });
}
