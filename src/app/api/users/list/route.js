import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User } = db;

export async function POST(req) {
  const body = await req.json();

  let user = await User.findByToken(body._token);

  const result = await User.findAll({
    where: {
      businessId: user.businessId,
    },
  });

  const list = result.map((n) => ({
    id: n.id,
    name: n.name,
    username: n.username,
  }));

  return NextResponse.json({
    data: {
      Users: list,
    },
  });
}