import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  const filePath = path.join(process.cwd(), "words.txt")
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const words = fileContent.split("\n").filter((word) => word.trim() !== "")
  return NextResponse.json({ words })
}

