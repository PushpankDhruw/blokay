import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  const userCreated = await User.create({
    id: body.data.userId,
    rol: body.data.rol,
  });

  return NextResponse.json({
    data: {},
  });
}
